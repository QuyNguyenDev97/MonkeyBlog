import React from "react";

const Postdecription = ({ children = "", className = "" }) => {
  return (
    <p className={className}>
      {children ||
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut elit at lectus sodales lacinia non nec nisl. Nam vel scelerisque purus. Maecenas venenatis sem neque, sed euismod purus commodo nec. Maecenas non pretium erat. Maecenas tellus massa, sodales et ipsum a, gravida euismod ante. Duis pellentesque ut ligula ac pellentesque. Curabitur commodo id libero eu accumsan. Morbi molestie ullamcorper lorem nec sagittis. Cras vehicula pretium purus sed tincidunt. Nulla vitae diam ac eros maximus tempor."}
    </p>
  );
};

export default Postdecription;
