import { Ref } from "../render/ref";
import { ComponentFn } from "./component";

export interface Handler<T = Event> {
  (event: T): void;
}

export type VDOMChild = VDOMElement | VDOMText;
export type VDOMChildren = (VDOMChild | false | undefined | null)[];
export type VDOMText = string | number;

export interface VDOMElement<
  Type = string | number | ComponentFn,
  Props = Record<string, any>
> {
  type: Type;
  props: Props;
  key?: string | number;
}

interface EventAttributes {
  onAbort?: Handler;
  onAutoComplete?: Handler;
  onAutoCompleteError?: Handler;
  onBlur?: Handler<FocusEvent>;
  onClick?: Handler<MouseEvent>;
  onSubmit?: Handler<Event>;
  onInput?: Handler<Event>;
}

export interface GlobalAttributes extends EventAttributes {
  autoCapitalize?: "on" | "off" | "none" | "sentences" | "words" | "characters";
  class?: string;
  contenteditable?: boolean;
  contextmenu?: string;
  dir?: "ltr" | "rtl";
  draggable?: boolean;
  dropzone?: boolean;
  enterkeyhint?: string;
  hidden?: boolean;
  id?: string;
  inputmode?: string;
  itemprop?: string;
  lang?: string;
  spellcheck?: boolean;
  style?: Record<string, string | number>;
  tabindex?: number;
  title?: string;
  translate?: string;
}

export interface AAttributes extends GlobalAttributes {
  download?: boolean;
  href?: string;
  hreflang?: string;
  media?: string;
  ping?: string;
  referrerpolicy?: string;
  rel?: string;
  shape?: string;
  target?: string;
}

export interface AreaAttributes extends GlobalAttributes {
  alt?: string;
  coords?: string;
  download?: boolean;
  href?: string;
  hreflang?: string;
  media?: string;
  ping?: string;
  referrerpolicy?: string;
  rel?: string;
  shape?: string;
  target?: string;
}

export interface AudioAttributes extends GlobalAttributes {
  autoplay?: boolean;
  controls?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  loop?: boolean;
  muted?: boolean;
  preload?: boolean;
  src?: string;
}

export interface BaseAttributes extends GlobalAttributes {
  href?: string;
  target?: string;
}

export interface BlockquoteAttributes extends GlobalAttributes {
  cite?: string;
}

export interface ButtonAttributes extends GlobalAttributes {
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  name?: string;
  type?: "submit" | "reset" | "button";
  value?: string;
}

export interface CanvasAttributes extends GlobalAttributes {
  height?: string | number;
  width?: string | number;
}

export interface CaptionAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ColAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface ColgroupAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface DataAttributes extends GlobalAttributes {
  value?: string;
}

export interface DelAttributes extends GlobalAttributes {
  cite?: string;
  datetime?: string;
}

export interface DetailsAttributes extends GlobalAttributes {
  open?: boolean;
}

export interface EmbedAttributes extends GlobalAttributes {
  height?: string | number;
  width?: string | number;
  src?: string;
  type?: string;
}

export interface FormAttributes extends GlobalAttributes {
  acceptCharset?: string;
  action?: string;
  autocomplete?: string;
  enctype?: string;
  method?: "GET" | "POST";
  name?: string;
  novalidate?: boolean;
  target?: string;
}

export interface FieldsetAttributes extends GlobalAttributes {
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface HtmlAttributes extends GlobalAttributes {
  manifest?: string;
}

export interface HrAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface IframeAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  allow?: string;
  csp?: string;
  height?: string | number;
  width?: string | number;
  importance?: string;
  loading?: "lazy" | "eager";
  name?: string;
  referrerpolicy?: string;
  sandbox?: boolean;
  src?: string;
  srcdoc?: string;
}

export interface ImgAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  alt?: string;
  crossorigin?: "anonymous" | "use-credentials";
  decoding?: string;
  height?: string | number;
  width?: string | number;
  importance?: string;
  ismap?: boolean;
  loading?: "lazy" | "eager";
  referrerpolicy?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  usemap?: string;
}

export interface InputAttributes extends GlobalAttributes {
  accept?: string;
  autocomplete?: string;
  dirname?: string;
  alt?: string;
  autofocus?: boolean;
  capture?: "user" | "environment";
  checked?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  height?: string | number;
  width?: string | number;
  list?: string;
  max?: string | number;
  maxlength?: number | string;
  minlength?: number | string;
  min?: string | number;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: number;
  type?:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reseet"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  usemap?: string;
  value?: string;
}

export interface InsAttributes extends GlobalAttributes {
  datetime?: string;
}

export interface LabelAttributes extends GlobalAttributes {
  for?: string;
  form?: string;
}

export interface LiAttributes extends GlobalAttributes {
  value?: string;
}

export interface LinkAttributes extends GlobalAttributes {
  crossorigin?: "anonymous" | "use-credentials";
  href?: string;
  hreflang?: string;
  importance?: string;
  integrity?: string;
  media?: string;
  referrerpolicy?: string;
  rel?: string;
  sizes?: string;
}

export interface MenuAttributes extends GlobalAttributes {
  type?: string;
}

export interface MapAttributes extends GlobalAttributes {
  name?: string;
}

export interface MetaAttributes extends GlobalAttributes {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  name?: string;
}

export interface MeterAttributes extends GlobalAttributes {
  form?: string;
  high?: string | number;
  low?: string | number;
  max?: string | number;
  min?: string | number;
  optimum?: string | number;
  value?: string;
}

export interface ObjectAttributes extends GlobalAttributes {
  data?: string;
  form?: string;
  height?: string | number;
  width?: string | number;
  name?: string;
  type?: string;
  typemustmatch?: boolean;
  usemap?: string;
}

export interface OlAttributes extends GlobalAttributes {
  reversed?: boolean;
  start?: number;
}

export interface OptgroupAttributes extends GlobalAttributes {
  disabled?: boolean;
  label?: string;
}

export interface OptionAttributes extends GlobalAttributes {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string;
}

export interface OutputAttributes extends GlobalAttributes {
  for?: string;
  form?: string;
  name?: string;
}

export interface ParamAttributes extends GlobalAttributes {
  name?: string;
  value?: string;
}

export interface ProgressAttributes extends GlobalAttributes {
  form?: string;
  max?: string | number;
  value?: string;
}

export interface ScriptAttributes extends GlobalAttributes {
  async?: boolean;
  charset?: string;
  crossorigin?: "anonymous" | "use-credentials";
  defer?: boolean;
  importance?: string;
  integrity?: string;
  language?: string;
  referrerpolicy?: string;
  src?: string;
  type?: string;
}

export interface SelectAttributes extends GlobalAttributes {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}

export interface SourceAttributes extends GlobalAttributes {
  media?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  type?: string;
}

export interface StyleAttributes extends GlobalAttributes {
  media?: string;
  scoped?: boolean;
  type?: string;
}

export interface TableAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  summary?: string;
}

export interface TbodyAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TdAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
}

export interface TextareaAttributes extends GlobalAttributes {
  autocomplete?: string;
  autofocus?: boolean;
  cols?: number;
  dirname?: string;
  disabled?: boolean;
  form?: string;
  maxlength?: number | string;
  minlength?: number | string;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  wrap?: boolean;
}

export interface TimeAttributes extends GlobalAttributes {
  datetime?: string;
}

export interface TfootAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ThAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
  scope?: string;
}

export interface TheadAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrAttributes extends GlobalAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrackAttributes extends GlobalAttributes {
  default?: boolean;
  kind?: string;
  label?: string;
  src?: string;
  srclang?: string;
}

export interface VideoAttributes extends GlobalAttributes {
  autoplay?: boolean;
  controls?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  height?: string | number;
  width?: string | number;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: boolean;
  src?: string;
}

export interface ElementTypes {
  html: HtmlAttributes
  base: BaseAttributes
  head: GlobalAttributes
  link: LinkAttributes
  meta: MetaAttributes
  style: StyleAttributes
  title: GlobalAttributes
  body: GlobalAttributes
  address: GlobalAttributes
  article: GlobalAttributes
  aside: GlobalAttributes
  footer: GlobalAttributes
  header: GlobalAttributes
  h1: GlobalAttributes
  h2: GlobalAttributes
  h3: GlobalAttributes
  h4: GlobalAttributes
  h5: GlobalAttributes
  h6: GlobalAttributes
  hgroup: GlobalAttributes
  main: GlobalAttributes
  nav: GlobalAttributes
  section: GlobalAttributes
  blockquote: BlockquoteAttributes
  dd: GlobalAttributes
  div: GlobalAttributes
  dl: GlobalAttributes
  dt: GlobalAttributes
  figcaption: GlobalAttributes
  figure: GlobalAttributes
  hr: HrAttributes
  li: GlobalAttributes
  ol: OlAttributes
  p: GlobalAttributes
  pre: GlobalAttributes
  ul: GlobalAttributes
  a: AAttributes
  abbr: GlobalAttributes
  b: GlobalAttributes
  bdi: GlobalAttributes
  bdo: GlobalAttributes
  br: GlobalAttributes
  cite: GlobalAttributes
  code: GlobalAttributes
  data: DataAttributes
  dfn: GlobalAttributes
  em: GlobalAttributes
  i: GlobalAttributes
  kbd: GlobalAttributes
  mark: GlobalAttributes
  q: GlobalAttributes
  rb: GlobalAttributes
  rp: GlobalAttributes
  rt: GlobalAttributes
  rtc: GlobalAttributes
  ruby: GlobalAttributes
  s: GlobalAttributes
  samp: GlobalAttributes
  small: GlobalAttributes
  span: GlobalAttributes
  strong: GlobalAttributes
  sub: GlobalAttributes
  sup: GlobalAttributes
  time: GlobalAttributes
  u: GlobalAttributes
  var: GlobalAttributes
  wbr: GlobalAttributes
  area: AreaAttributes
  audio: AudioAttributes
  img: ImgAttributes
  map: MapAttributes
  track: TrackAttributes
  video: VideoAttributes
  embed: EmbedAttributes
  iframe: IframeAttributes
  object: ObjectAttributes
  param: ParamAttributes
  picture: GlobalAttributes
  source: SourceAttributes
  canvas: CanvasAttributes
  noscript: GlobalAttributes
  script: ScriptAttributes
  del: DelAttributes
  ins: InsAttributes
  caption: CaptionAttributes
  col: ColAttributes
  colgroup: ColgroupAttributes
  table: TableAttributes
  tbody: TbodyAttributes
  td: TdAttributes
  tfoot: TfootAttributes
  th: ThAttributes
  thead: TheadAttributes
  tr: TrAttributes
  button: ButtonAttributes
  datalist: GlobalAttributes
  fieldset: FieldsetAttributes
  form: FormAttributes
  input: InputAttributes
  label: LabelAttributes
  legend: GlobalAttributes
  meter: MeterAttributes
  optgroup: OptgroupAttributes
  option: OptionAttributes
  output: OutputAttributes
  progress: ProgressAttributes
  select: SelectAttributes
  textarea: TextareaAttributes
  details: DetailsAttributes
  dialog: GlobalAttributes
  menu: MenuAttributes
  summary: GlobalAttributes
}

export type ElementType = keyof ElementTypes;

export type ElementAttributes<Type extends ElementType = ElementType> =
  ElementTypes[Type] & {
    children?: VDOMChildren;
    ref?: Ref;
  };
