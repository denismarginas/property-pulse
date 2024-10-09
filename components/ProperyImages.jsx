import Image from "next/image";

const ProperyImages = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={
              images[0].startsWith("https")
                ? images[0]
                : `/images/properties/${images[0]}`
            }
            className="object-cover h-[400px] w-full rounded-xl"
            width={1800}
            height={400}
            priority={true}
            alt="ProperyImage 1"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`${
                  images.length === 3 && index === 2
                    ? "col-span-2"
                    : "col-span-1"
                }`}
              >
                <Image
                  src={
                    image.startsWith("https")
                      ? image
                      : `/images/properties/${image}`
                  }
                  className="object-cover h-[400px] w-full rounded-xl "
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                  alt={`ProperyImage -${index}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProperyImages;
