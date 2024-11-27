"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(
    property.isBookmarked || false
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const checkBookmarksStatus = async () => {
      try {
        const res = await fetch("/api/bookmarks/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        } else {
          const error = await res.json();
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkBookmarksStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a property");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setIsBookmarked(data.isBookmarked);
      } else {
        const error = await res.json();
        toast.error(error.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to bookmark property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">...Loading</p>;
  return (
    <button
      onClick={handleClick}
      className={`w-full py-2 px-4 rounded-full flex items-center justify-center font-bold ${
        isBookmarked
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      disabled={loading}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <>
          <FaRegBookmark className="mr-2" /> Remove Bookmark
        </>
      ) : (
        <>
          <FaBookmark className="mr-2" /> Add to Bookmarks
        </>
      )}
    </button>
  );
};

export default BookmarkButton;
