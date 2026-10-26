// export const ImageValidator = (e) => {
//   if (e.target.files.length === 1) {
//     let pic = e.target.files[0];
//     console.log(pic);
//     if(!["image/jpeg","image/jpg","image/png","image/gif","image/webp",].includes(pic.type))
//         return "Invaild pic format allow formats are .jpg, .jpeg, .png, .gif"
//     else if(pic.size>1048576)
//          return "Pic size is too heavy please upload an image upto 1 mb ";
//     else
//         return ""
//   }
// };
export const ImageValidator = (e) => {
  if (!e.target.files || e.target.files.length === 0) {
    return "Please select an image";
  }

  let pic = e.target.files[0];

  if (
    ![
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ].includes(pic.type)
  ) {
    return "Invalid pic format. Allowed formats are .jpg, .jpeg, .png, .gif, .webp";
  }

  if (pic.size > 1048576) {
    return "Pic size is too heavy. Please upload an image up to 1 MB";
  }

  return "";
};