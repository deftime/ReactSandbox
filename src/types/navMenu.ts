export interface MainMenuElem {
  id: number,
  title: string,
  url: string
  children?: MainMenuElem[]
}