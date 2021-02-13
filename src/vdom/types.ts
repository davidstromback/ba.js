import { ComponentFn } from "./component";

export interface Handler<T = Event> {
  (event: T): void;
}

export type VDOMChild = VDOMElement | VDOMNode;
export type VDOMChildren = (VDOMChild | false | undefined | null)[];
export type VDOMNode = string | number;

export interface VDOMElement<
  Type = string | ComponentFn,
  Attributes = Record<string, any>
> {
  type: Type;
  props: Attributes;
  children: VDOMChildren;
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

export type Attributes<T = {}> = T & GlobalAttributes;

export interface AAttributes {
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

export interface AreaAttributes {
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

export interface AudioAttributes {
  autoplay?: boolean;
  controls?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  loop?: boolean;
  muted?: boolean;
  preload?: boolean;
  src?: string;
}

export interface BaseAttributes {
  href?: string;
  target?: string;
}

export interface BlockquoteAttributes {
  cite?: string;
}

export interface ButtonAttributes {
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

export interface CanvasAttributes {
  height?: string | number;
  width?: string | number;
}

export interface CaptionAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ColAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface ColgroupAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface DataAttributes {
  value?: string;
}

export interface DelAttributes {
  cite?: string;
  datetime?: string;
}

export interface DetailsAttributes {
  open?: boolean;
}

export interface EmbedAttributes {
  height?: string | number;
  width?: string | number;
  src?: string;
  type?: string;
}

export interface FormAttributes {
  acceptCharset?: string;
  action?: string;
  autocomplete?: string;
  enctype?: string;
  method?: "GET" | "POST";
  name?: string;
  novalidate?: boolean;
  target?: string;
}

export interface FieldsetAttributes {
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface HtmlAttributes {
  manifest?: string;
}

export interface HrAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface IframeAttributes {
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

export interface ImgAttributes {
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

export interface InputAttributes {
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

export interface InsAttributes {
  datetime?: string;
}

export interface LabelAttributes {
  for?: string;
  form?: string;
}

export interface LiAttributes {
  value?: string;
}

export interface LinkAttributes {
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

export interface MenuAttributes {
  type?: string;
}

export interface MapAttributes {
  name?: string;
}

export interface MetaAttributes {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  name?: string;
}

export interface MeterAttributes {
  form?: string;
  high?: string | number;
  low?: string | number;
  max?: string | number;
  min?: string | number;
  optimum?: string | number;
  value?: string;
}

export interface ObjectAttributes {
  data?: string;
  form?: string;
  height?: string | number;
  width?: string | number;
  name?: string;
  type?: string;
  typemustmatch?: boolean;
  usemap?: string;
}

export interface OlAttributes {
  reversed?: boolean;
  start?: number;
}

export interface OptgroupAttributes {
  disabled?: boolean;
  label?: string;
}

export interface OptionAttributes {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string;
}

export interface OutputAttributes {
  for?: string;
  form?: string;
  name?: string;
}

export interface ParamAttributes {
  name?: string;
  value?: string;
}

export interface ProgressAttributes {
  form?: string;
  max?: string | number;
  value?: string;
}

export interface ScriptAttributes {
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

export interface SelectAttributes {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}

export interface SourceAttributes {
  media?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  type?: string;
}

export interface StyleAttributes {
  media?: string;
  scoped?: boolean;
  type?: string;
}

export interface TableAttributes {
  align?: "left" | "right" | "center" | "justify";
  summary?: string;
}

export interface TbodyAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TdAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
}

export interface TextareaAttributes {
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

export interface TimeAttributes {
  datetime?: string;
}

export interface TfootAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ThAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
  scope?: string;
}

export interface TheadAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrackAttributes {
  default?: boolean;
  kind?: string;
  label?: string;
  src?: string;
  srclang?: string;
}

export interface VideoAttributes {
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
  html: Attributes<HtmlAttributes>;
  base: Attributes<BaseAttributes>;
  head: Attributes;
  link: Attributes<LinkAttributes>;
  meta: Attributes<MetaAttributes>;
  style: Attributes<StyleAttributes>;
  title: Attributes;
  body: Attributes;
  address: Attributes;
  article: Attributes;
  aside: Attributes;
  footer: Attributes;
  header: Attributes;
  h1: Attributes;
  h2: Attributes;
  h3: Attributes;
  h4: Attributes;
  h5: Attributes;
  h6: Attributes;
  hgroup: Attributes;
  main: Attributes;
  nav: Attributes;
  section: Attributes;
  blockquote: Attributes<BlockquoteAttributes>;
  dd: Attributes;
  div: Attributes;
  dl: Attributes;
  dt: Attributes;
  figcaption: Attributes;
  figure: Attributes;
  hr: Attributes<HrAttributes>;
  li: Attributes;
  ol: Attributes<OlAttributes>;
  p: Attributes;
  pre: Attributes;
  ul: Attributes;
  a: Attributes<AAttributes>;
  abbr: Attributes;
  b: Attributes;
  bdi: Attributes;
  bdo: Attributes;
  br: Attributes;
  cite: Attributes;
  code: Attributes;
  data: Attributes<DataAttributes>;
  dfn: Attributes;
  em: Attributes;
  i: Attributes;
  kbd: Attributes;
  mark: Attributes;
  q: Attributes;
  rb: Attributes;
  rp: Attributes;
  rt: Attributes;
  rtc: Attributes;
  ruby: Attributes;
  s: Attributes;
  samp: Attributes;
  small: Attributes;
  span: Attributes;
  strong: Attributes;
  sub: Attributes;
  sup: Attributes;
  time: Attributes;
  u: Attributes;
  var: Attributes;
  wbr: Attributes;
  area: Attributes<AreaAttributes>;
  audio: Attributes<AudioAttributes>;
  img: Attributes<ImgAttributes>;
  map: Attributes<MapAttributes>;
  track: Attributes<TrackAttributes>;
  video: Attributes<VideoAttributes>;
  embed: Attributes<EmbedAttributes>;
  iframe: Attributes<IframeAttributes>;
  object: Attributes<ObjectAttributes>;
  param: Attributes<ParamAttributes>;
  picture: Attributes;
  source: Attributes<SourceAttributes>;
  canvas: Attributes<CanvasAttributes>;
  noscript: Attributes;
  script: Attributes<ScriptAttributes>;
  del: Attributes<DelAttributes>;
  ins: Attributes<InsAttributes>;
  caption: Attributes<CaptionAttributes>;
  col: Attributes<ColAttributes>;
  colgroup: Attributes<ColgroupAttributes>;
  table: Attributes<TableAttributes>;
  tbody: Attributes<TbodyAttributes>;
  td: Attributes<TdAttributes>;
  tfoot: Attributes<TfootAttributes>;
  th: Attributes<ThAttributes>;
  thead: Attributes<TheadAttributes>;
  tr: Attributes<TrAttributes>;
  button: Attributes<ButtonAttributes>;
  datalist: Attributes;
  fieldset: Attributes<FieldsetAttributes>;
  form: Attributes<FormAttributes>;
  input: Attributes<InputAttributes>;
  label: Attributes<LabelAttributes>;
  legend: Attributes;
  meter: Attributes<MeterAttributes>;
  optgroup: Attributes<OptgroupAttributes>;
  option: Attributes<OptionAttributes>;
  output: Attributes<OutputAttributes>;
  progress: Attributes<ProgressAttributes>;
  select: Attributes<SelectAttributes>;
  textarea: Attributes<TextareaAttributes>;
  details: Attributes<DetailsAttributes>;
  dialog: Attributes;
  menu: Attributes<MenuAttributes>;
  summary: Attributes;
}

export type ElementType = keyof ElementTypes;

export type AttributeType = ElementTypes[ElementType][keyof ElementTypes[ElementType]];

export type ElementAttributes<Type extends ElementType> = ElementTypes[Type];
