import { ContextType } from "../../old/render/types";
import {
  COMPONENT,
  CONTEXT,
  ELEMENT,
  FRAGMENT,
  ROOT,
  TEXT,
} from "./util/type-guards";

export type DOMNode = globalThis.Node;
export type DOMText = globalThis.Text;
export type DOMElement = globalThis.Element;
export type DOMFragment = globalThis.DocumentFragment;

export type PropsWithKey<P = Record<string, unknown>> = P & {
  key?: string | number;
};

export type PropsWithChildren<P = Record<string, unknown>> = P & {
  children?: VDOMChildren;
};

export type ElementAttributes<T = string> = T extends HTMLElementType
  ? PropsWithChildren<HTMLElementsMap[T]>
  : PropsWithChildren<HTMLElementAttributes & Record<string, unknown>>;

export interface FunctionComponent<P extends Record<string, unknown> = any> {
  (props: P): VDOMChildren;
}

export type ComponentProps<T> = T extends FunctionComponent<infer P>
  ? P
  : never;

export type PropsOf<T> = T extends string
  ? ElementAttributes<T>
  : ComponentProps<T>;

export type Children<P> = P extends { children?: infer C } ? C : never;

export interface NodeFactory<T extends Record<string, any>> {
  (props: PropsWithKey<T>): VDOMNode;
  (props: PropsWithKey<T>): VDOMNode;
}

export interface ParentFactory<T> extends NodeFactory<T> {
  (props: Omit<PropsWithKey<T>, "children">, children: Children<T>): VDOMNode;
  (props: Omit<PropsWithKey<T>, "children">, children: Children<T>): VDOMNode;
}

export interface ElementFactory<T extends string> {
  (children?: VDOMText | VDOMVoid | Array<VDOMChildren>): VDOMNode;
  (
    props?: PropsWithKey<ElementAttributes<T>>,
    children?: VDOMChildren
  ): VDOMNode;
}

export interface VDOMNode {
  type: unknown;
  key?: string | number;
  [key: string]: unknown;
  props: Record<string, any>;
}

export type HTMLElementType = keyof HTMLElementsMap;

export interface VDOMElement<T extends string = string> extends VDOMNode {
  type: HTMLElementType;
  props: ElementAttributes<T>;
}

export interface VDOMComponent<
  P extends Record<string, unknown> = Record<string, unknown>
> extends VDOMNode {
  type: FunctionComponent<P>;
  props: P;
}

export interface VDOMFragment extends VDOMNode {
  type: typeof FRAGMENT;
  children: VDOMChildren;
}

export interface Context<T = any> {
  (value: T, children: VDOMChildren): VDOMNode;
  defaultValue: T;
}

export interface ContextProviderProps<T = any> {
  value: T;
  children: VDOMChildren;
}

export interface VDOMContextProvider<T = any> extends VDOMNode {
  type: typeof CONTEXT;
  context: Context<T>;
  props: ContextProviderProps<T>;
}

export interface VDOMFragment extends VDOMNode {
  type: typeof FRAGMENT;
  children: VDOMChildren;
}

export type VDOMText = string | number;

export type VDOM = VDOMText | VDOMNode;

export type VDOMVoid = boolean | null | undefined | void;

export type VDOMChild = VDOM | VDOMVoid;

export type VDOMChildren = VDOMChild | Array<VDOMChildren>;

export type RootType = typeof ROOT;

export type FragmentType = typeof FRAGMENT;

export type TextType = typeof TEXT;

export type ElementType = typeof ELEMENT;

export type ComponentType = typeof COMPONENT;

export interface Node {
  type: number;
  [key: string]: unknown;
  needsUpdate: boolean;
  needsCommit: boolean;
}

export interface DOMLiteral extends Node {
  dom: DOMNode;
}

export interface Parent extends Node {
  children: Array<Child>;
  pendingChildren: Array<VDOM> | undefined;
}

export interface Child extends Node {
  parent: Parent;
  index: number;
  mounted: boolean;
  vdom: VDOM;
  pendingVDom: VDOM | undefined;
}

export interface Root extends Parent, DOMLiteral {
  type: RootType;
  dom: DOMElement;
}

export interface Fragment extends Parent, Child {
  type: FragmentType;
  vdom: VDOMFragment;
  pendingVDom: VDOMFragment | undefined;
}

export interface ContextProvider extends Parent, Child {
  type: ContextType;
  vdom: VDOMContextProvider;
  pendingVDom: VDOMContextProvider | undefined;
  consumers: Array<Component>;
}

export interface Text extends Child, DOMLiteral {
  type: TextType;
  vdom: VDOMText;
  dom: DOMText;
  pendingVDom: VDOMText | undefined;
}

export interface Element extends Parent, Child, DOMLiteral {
  type: ElementType;
  vdom: VDOMElement;
  dom: DOMElement;
  pendingVDom: VDOMElement | undefined;
}

export interface Component extends Parent, Child {
  type: ComponentType;
  vdom: VDOMComponent;
  hooks: Array<Hook>;
  unmounting: boolean;
  pendingVDom: VDOMComponent | undefined;
}

export type UseEffectType = 0;

export type UseRefType = 1;

export type UseStateType = 2;

export type UseMemoType = 3;

export type UseCallbackType = 4;

export type ProvideContextType = 5;

export type ConsumeContextType = 6;

export interface Hook {
  type: unknown;
}

export interface UseEffect extends Hook {
  type: UseEffectType;
  deps: Array<unknown>;
  pendingEffect?: () => void | (() => void);
  pendingCleanup?: () => void;
}

export interface UseRef<T> extends Hook {
  type: UseRefType;
  ref: Ref<T>;
}

export interface SetState<T> {
  (next: T | ((prev: T) => T)): void;
}

export interface UseState<T> extends Hook {
  type: UseStateType;
  state: T;
  setState: SetState<T>;
}

export interface UseMemo<T> extends Hook {
  type: UseMemoType;
  deps: Array<unknown>;
  value: T;
}

export interface UseCallback<T> extends Hook {
  type: UseCallbackType;
  deps: Array<unknown>;
  current: T;
}

export interface ProvideContext<T> extends Hook {
  type: ProvideContextType;
  context: Context<T>;
  value: T;
  consumers: Array<Component>;
}

export interface ConsumeContext<T> extends Hook {
  type: ConsumeContextType;
  context: Context<T>;
  provider?: ProvideContext<T>;
}

export interface Update {
  needsUpdate: Array<Node>;
  needsCommit: Array<Node>;
  needsEffects: Array<Component>;
}

export interface Ref<T = unknown> {
  value: T;
}

export interface EventHandler<T = Event> {
  (event: T): void;
}

export interface EventAttributes {
  onAbort?: EventHandler;
  onAutoComplete?: EventHandler;
  onAutoCompleteError?: EventHandler;
  onBlur?: EventHandler<FocusEvent>;
  onClick?: EventHandler<MouseEvent>;
  onSubmit?: EventHandler<Event>;
  onInput?: EventHandler<Event>;
}

export interface HTMLElementAttributes extends EventAttributes {
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

export interface AAttributes extends HTMLElementAttributes {
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

export interface AreaAttributes extends HTMLElementAttributes {
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

export interface AudioAttributes extends HTMLElementAttributes {
  autoplay?: boolean;
  controls?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  loop?: boolean;
  muted?: boolean;
  preload?: boolean;
  src?: string;
}

export interface BaseAttributes extends HTMLElementAttributes {
  href?: string;
  target?: string;
}

export interface BlockquoteAttributes extends HTMLElementAttributes {
  cite?: string;
}

export interface ButtonAttributes extends HTMLElementAttributes {
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

export interface CanvasAttributes extends HTMLElementAttributes {
  height?: string | number;
  width?: string | number;
}

export interface CaptionAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ColAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface ColgroupAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
  span?: string;
}

export interface DataAttributes extends HTMLElementAttributes {
  value?: string;
}

export interface DelAttributes extends HTMLElementAttributes {
  cite?: string;
  datetime?: string;
}

export interface DetailsAttributes extends HTMLElementAttributes {
  open?: boolean;
}

export interface EmbedAttributes extends HTMLElementAttributes {
  height?: string | number;
  width?: string | number;
  src?: string;
  type?: string;
}

export interface FormAttributes extends HTMLElementAttributes {
  acceptCharset?: string;
  action?: string;
  autocomplete?: string;
  enctype?: string;
  method?: "GET" | "POST";
  name?: string;
  novalidate?: boolean;
  target?: string;
}

export interface FieldsetAttributes extends HTMLElementAttributes {
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface HtmlAttributes extends HTMLElementAttributes {
  manifest?: string;
}

export interface HrAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface IframeAttributes extends HTMLElementAttributes {
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

export interface ImgAttributes extends HTMLElementAttributes {
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

export interface InputAttributes extends HTMLElementAttributes {
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

export interface InsAttributes extends HTMLElementAttributes {
  datetime?: string;
}

export interface LabelAttributes extends HTMLElementAttributes {
  for?: string;
  form?: string;
}

export interface LiAttributes extends HTMLElementAttributes {
  value?: string;
}

export interface LinkAttributes extends HTMLElementAttributes {
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

export interface MenuAttributes extends HTMLElementAttributes {
  type?: string;
}

export interface MapAttributes extends HTMLElementAttributes {
  name?: string;
}

export interface MetaAttributes extends HTMLElementAttributes {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  name?: string;
}

export interface MeterAttributes extends HTMLElementAttributes {
  form?: string;
  high?: string | number;
  low?: string | number;
  max?: string | number;
  min?: string | number;
  optimum?: string | number;
  value?: string;
}

export interface ObjectAttributes extends HTMLElementAttributes {
  data?: string;
  form?: string;
  height?: string | number;
  width?: string | number;
  name?: string;
  type?: string;
  typemustmatch?: boolean;
  usemap?: string;
}

export interface OlAttributes extends HTMLElementAttributes {
  reversed?: boolean;
  start?: number;
}

export interface OptgroupAttributes extends HTMLElementAttributes {
  disabled?: boolean;
  label?: string;
}

export interface OptionAttributes extends HTMLElementAttributes {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string;
}

export interface OutputAttributes extends HTMLElementAttributes {
  for?: string;
  form?: string;
  name?: string;
}

export interface ParamAttributes extends HTMLElementAttributes {
  name?: string;
  value?: string;
}

export interface ProgressAttributes extends HTMLElementAttributes {
  form?: string;
  max?: string | number;
  value?: string;
}

export interface ScriptAttributes extends HTMLElementAttributes {
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

export interface SelectAttributes extends HTMLElementAttributes {
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}

export interface SourceAttributes extends HTMLElementAttributes {
  media?: string;
  sizes?: string;
  src?: string;
  srcset?: string;
  type?: string;
}

export interface StyleAttributes extends HTMLElementAttributes {
  media?: string;
  scoped?: boolean;
  type?: string;
}

export interface TableAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
  summary?: string;
}

export interface TbodyAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TdAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
}

export interface TextareaAttributes extends HTMLElementAttributes {
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

export interface TimeAttributes extends HTMLElementAttributes {
  datetime?: string;
}

export interface TfootAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface ThAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
  colspan?: number;
  headers?: string;
  rowspan?: number;
  scope?: string;
}

export interface TheadAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrAttributes extends HTMLElementAttributes {
  align?: "left" | "right" | "center" | "justify";
}

export interface TrackAttributes extends HTMLElementAttributes {
  default?: boolean;
  kind?: string;
  label?: string;
  src?: string;
  srclang?: string;
}

export interface VideoAttributes extends HTMLElementAttributes {
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

export interface HTMLElementsMap {
  html: HtmlAttributes;
  base: BaseAttributes;
  head: HTMLElementAttributes;
  link: LinkAttributes;
  meta: MetaAttributes;
  style: StyleAttributes;
  title: HTMLElementAttributes;
  body: HTMLElementAttributes;
  address: HTMLElementAttributes;
  article: HTMLElementAttributes;
  aside: HTMLElementAttributes;
  footer: HTMLElementAttributes;
  header: HTMLElementAttributes;
  h1: HTMLElementAttributes;
  h2: HTMLElementAttributes;
  h3: HTMLElementAttributes;
  h4: HTMLElementAttributes;
  h5: HTMLElementAttributes;
  h6: HTMLElementAttributes;
  hgroup: HTMLElementAttributes;
  main: HTMLElementAttributes;
  nav: HTMLElementAttributes;
  section: HTMLElementAttributes;
  blockquote: BlockquoteAttributes;
  dd: HTMLElementAttributes;
  div: HTMLElementAttributes;
  dl: HTMLElementAttributes;
  dt: HTMLElementAttributes;
  figcaption: HTMLElementAttributes;
  figure: HTMLElementAttributes;
  hr: HrAttributes;
  li: HTMLElementAttributes;
  ol: OlAttributes;
  p: HTMLElementAttributes;
  pre: HTMLElementAttributes;
  ul: HTMLElementAttributes;
  a: AAttributes;
  abbr: HTMLElementAttributes;
  b: HTMLElementAttributes;
  bdi: HTMLElementAttributes;
  bdo: HTMLElementAttributes;
  br: HTMLElementAttributes;
  cite: HTMLElementAttributes;
  code: HTMLElementAttributes;
  data: DataAttributes;
  dfn: HTMLElementAttributes;
  em: HTMLElementAttributes;
  i: HTMLElementAttributes;
  kbd: HTMLElementAttributes;
  mark: HTMLElementAttributes;
  q: HTMLElementAttributes;
  rb: HTMLElementAttributes;
  rp: HTMLElementAttributes;
  rt: HTMLElementAttributes;
  rtc: HTMLElementAttributes;
  ruby: HTMLElementAttributes;
  s: HTMLElementAttributes;
  samp: HTMLElementAttributes;
  small: HTMLElementAttributes;
  span: HTMLElementAttributes;
  strong: HTMLElementAttributes;
  sub: HTMLElementAttributes;
  sup: HTMLElementAttributes;
  time: HTMLElementAttributes;
  u: HTMLElementAttributes;
  var: HTMLElementAttributes;
  wbr: HTMLElementAttributes;
  area: AreaAttributes;
  audio: AudioAttributes;
  img: ImgAttributes;
  map: MapAttributes;
  track: TrackAttributes;
  video: VideoAttributes;
  embed: EmbedAttributes;
  iframe: IframeAttributes;
  object: ObjectAttributes;
  param: ParamAttributes;
  picture: HTMLElementAttributes;
  source: SourceAttributes;
  canvas: CanvasAttributes;
  noscript: HTMLElementAttributes;
  script: ScriptAttributes;
  del: DelAttributes;
  ins: InsAttributes;
  caption: CaptionAttributes;
  col: ColAttributes;
  colgroup: ColgroupAttributes;
  table: TableAttributes;
  tbody: TbodyAttributes;
  td: TdAttributes;
  tfoot: TfootAttributes;
  th: ThAttributes;
  thead: TheadAttributes;
  tr: TrAttributes;
  button: ButtonAttributes;
  datalist: HTMLElementAttributes;
  fieldset: FieldsetAttributes;
  form: FormAttributes;
  input: InputAttributes;
  label: LabelAttributes;
  legend: HTMLElementAttributes;
  meter: MeterAttributes;
  optgroup: OptgroupAttributes;
  option: OptionAttributes;
  output: OutputAttributes;
  progress: ProgressAttributes;
  select: SelectAttributes;
  textarea: TextareaAttributes;
  details: DetailsAttributes;
  dialog: HTMLElementAttributes;
  menu: MenuAttributes;
  summary: HTMLElementAttributes;
}
