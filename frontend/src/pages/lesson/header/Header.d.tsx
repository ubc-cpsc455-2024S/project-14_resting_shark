import Content from "../../../class/Content";

export type HeaderProps = {
  pageNumber: number;
  contentList: Content[];
  direction: string;
  setPageNumber: (pageNumber: number) => void;
};
