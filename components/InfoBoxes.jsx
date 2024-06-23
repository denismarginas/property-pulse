import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgorundColor="bg-gray-100"
            textColor="text-gray-800"
            buttonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgorundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgorundColor="bg-blue-100"
            textColor="text-gray-800"
            buttonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgorundColor: "bg-blue-600",
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
