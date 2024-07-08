import Content from "../../../class/Content";

export type HeaderProps = {
  lives: number;
  pageNumber: number;
  streakCount: number;
  contentList: Content[];
  direction: string;
  setPageNumber: (pageNumber: number) => void;
};
