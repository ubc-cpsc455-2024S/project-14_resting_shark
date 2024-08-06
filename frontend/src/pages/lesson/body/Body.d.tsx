import Content from "../../../class/Content";

export type BodyProps = {
  pageNumber: number;
  contentList: Content[];
  setPageNumber: (pageNumber: number) => void;
  setButtonText: (buttonText: string) => void;
  renderedPage: JSX.Element | null;
  buttonText: string;
  chapters?: any;
  lives: number;
  streak: number;
};
