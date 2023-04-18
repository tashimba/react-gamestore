import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonGamesPage = (props) => (
  <ContentLoader
    speed={2}
    width={310}
    height={305}
    viewBox="0 0 310 305"
    backgroundColor="#696969"
    foregroundColor="#a3a3a3"
    {...props}
  >
    <rect x="0" y="201" rx="8" ry="8" width="199" height="23" />
    <rect x="0" y="237" rx="8" ry="8" width="46" height="23" />
    <rect x="56" y="236" rx="8" ry="8" width="42" height="24" />
    <rect x="251" y="213" rx="10" ry="10" width="47" height="45" />
    <rect x="113" y="236" rx="8" ry="8" width="44" height="24" />
    <rect x="1" y="275" rx="8" ry="8" width="92" height="20" />
    <rect x="0" y="2" rx="20" ry="20" width="310" height="180" />
    <rect x="103" y="275" rx="8" ry="8" width="99" height="21" />
    <rect x="211" y="275" rx="8" ry="8" width="92" height="20" />
  </ContentLoader>
);
export default SkeletonGamesPage;
