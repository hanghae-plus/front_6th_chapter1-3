import { BASE_URL } from "../constants";
import { type ComponentProps, memo } from "react";

export const PublicImage = memo(({ src, ...props }: ComponentProps<"img">) => {
  // URL을 이용해서 src와 BASE_URL을 결합
  // src: /images/logo.png
  // BASE_URL: /front_6th_chapter1-2/
  const url = String(BASE_URL + src).replace("//", "/");

  return <img src={url} {...props} />;
});

PublicImage.displayName = "PublicImage";
