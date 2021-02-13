import { component } from "./component";

/**
 * The HTML \<html\> element represents the root (top-level element) of an HTML
 * document, so it is also referred to as the root element. All other elements
 * must be descendants of this element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html)
 */
export const html = component("html");

/**
 * The HTML \<base\> element specifies the base URL to use for all relative URLs
 * in a document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base)
 */
export const base = component("base");

/**
 * The HTML \<head\> element contains machine-readable information (metadata)
 * about the document, like its title, scripts, and style sheets.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head)
 */
export const head = component("head");

/**
 * The HTML External Resource Link element (\<link\>) specifies relationships
 * between the current document and an external resource. This element is most
 * commonly used to link to stylesheets, but is also used to establish site
 * icons (both "favicon" style icons and icons for the home screen and apps on
 * mobile devices) among other things.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link)
 */
export const link = component("link");

/**
 * The HTML \<meta\> element represents metadata that cannot be represented by
 * other HTML meta-related elements, like \<base\>, \<link\>, \<script\>,
 * <style\> or \<title\>.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)
 *
 */
export const meta = component("meta");

/**
 * The HTML \<style\> element contains style information for a document, or part
 * of a document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style)
 */
export const style = component("style");

/**
 * The HTML Title element (\<title\>) defines the document's title that is shown
 * in a browser's title bar or a page's tab.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
 */
export const title = component("title");

/**
 * The HTML \<body\> Element represents the content of an HTML document. There
 * can be only one \<body\> element in a document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body)
 */
export const body = component("body");

/**
 * The HTML \<address\> element indicates that the enclosed HTML provides
 * contact information for a person or people, or for an organization.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)
 */
export const address = component("address");

/**
 * The HTML \<article\> element represents a self-contained composition in a
 * document, page, application, or site, which is intended to be independently
 * distributable or reusable (e.g., in syndication).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)
 */
export const article = component("article");

/**
 * The HTML \<aside\> element represents a portion of a document whose content
 * is only indirectly related to the document's main content.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside)
 */
export const aside = component("aside");

/**
 * The HTML \<footer\> element represents a footer for its nearest sectioning
 * content or sectioning root element. A footer typically contains information
 * about the author of the section, copyright data or links to related
 * documents.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer)
 */
export const footer = component("footer");

/**
 * The HTML \<header\> element represents introductory content, typically a
 * group of introductory or navigational aids. It may contain some heading
 * elements but also a logo, a search form, an author name, and other elements.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
 */
export const header = component("header");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header)
 */
export const h1 = component("h1");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2)
 */
export const h2 = component("h2");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3)
 */
export const h3 = component("h3");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4)
 */
export const h4 = component("h4");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5)
 */
export const h5 = component("h5");

/**
 * The HTML \<h1\>–\<h6\> elements represent six levels of section headings.
 * \<h1\> is the highest section level and \<h6\> is the lowest.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6)
 */
export const h6 = component("h6");

/**
 * The HTML \<hgroup\> element represents a multi-level heading for a section of
 * a document. It groups a set of \<h1\>–\<h6\> elements.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup)
 */
export const hgroup = component("hgroup");

/**
 * The HTML \<main\> element represents the dominant content of the \<body\> of
 * a document. The main content area consists of content that is directly
 * related to or expands upon the central topic of a document, or the central
 * functionality of an application.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main)
 */
export const main = component("main");

/**
 * The HTML \<nav\> element represents a section of a page whose purpose is to
 * provide navigation links, either within the current document or to other
 * documents. Common examples of navigation sections are menus, tables of
 * contents, and indexes.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav)
 */
export const nav = component("nav");

/**
 * The HTML \<section\> element represents a standalone section — which doesn't
 * have a more specific semantic element to represent it — contained within an
 * HTML document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section)
 */
export const section = component("section");

/**
 * The HTML \<blockquote\> Element (or HTML Block Quotation Element) indicates
 * that the enclosed text is an extended quotation. Usually, this is rendered
 * visually by indentation (see Notes for how to change it). A URL for the
 * source of the quotation may be given using the cite attribute, while a text
 * representation of the source can be given using the \<cite\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote)
 */
export const blockquote = component("blockquote");

/**
 * The HTML \<dd\> element provides the description, definition, or value for
 * the preceding term (\<dt\>) in a description list (\<dl\>).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd)
 */
export const dd = component("dd");

/**
 * The HTML Content Division element (\<div\>) is the generic container for flow
 * content. It has no effect on the content or layout until styled in some way
 * using CSS (e.g. styling is directly applied to it, or some kind of layout
 * model like Flexbox is applied to its parent element).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)
 */
export const div = component("div");

/**
 * The HTML \<dl\> element represents a description list. The element encloses a
 * list of groups of terms (specified using the \<dt\> element) and descriptions
 * (provided by \<dd\> elements). Common uses for this element are to implement
 * a glossary or to display metadata (a list of key-value pairs).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl)
 */
export const dl = component("dl");

/**
 * The HTML \<dt\> element specifies a term in a description or definition list,
 * and as such must be used inside a \<dl\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt)
 */
export const dt = component("dt");

/**
 * The HTML \<figcaption\> or Figure Caption element represents a caption or
 * legend describing the rest of the contents of its parent \<figure\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption)
 */
export const figcaption = component("figcaption");

/**
 * The HTML \<figure\> (Figure With Optional Caption) element represents
 * self-contained content, potentially with an optional caption, which is
 * specified using the (\<figcaption\>) element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure)
 */
export const figure = component("figure");

/**
 * The HTML \<hr\> element represents a thematic break between paragraph-level
 * elements: for example, a change of scene in a story, or a shift of topic
 * within a section.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr)
 */
export const hr = component("hr");

/**
 * The HTML \<li\> element is used to represent an item in a list.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li)
 */
export const li = component("li");

/**
 * The HTML \<ol\> element represents an ordered list of items — typically
 * rendered as a numbered list.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol)
 */
export const ol = component("ol");

/**
 * The HTML \<p\> element represents a paragraph.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)
 */
export const p = component("p");

/**
 * The HTML \<pre\> element represents preformatted text which is to be
 * presented exactly as written in the HTML file.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre)
 */
export const pre = component("pre");

/**
 * The HTML \<ul\> element represents an unordered list of items, typically
 * rendered as a bulleted list.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul)
 */
export const ul = component("ul");

/**
 * The HTML \<a\> element (or anchor element), with its href attribute, creates
 * a hyperlink to web pages, files, email addresses, locations in the same page,
 * or anything else a URL can address.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a)
 */
export const a = component("a");

/**
 * The HTML Abbreviation element (\<abbr\>) represents an abbreviation or
 * acronym; the optional title attribute can provide an expansion or description
 * for the abbreviation.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr)
 */
export const abbr = component("abbr");

/**
 * The HTML Bring Attention To element (\<b\>) is used to draw the reader's
 * attention to the element's contents, which are not otherwise granted special
 * importance.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b)
 */
export const b = component("b");

/**
 * The HTML Bidirectional Isolate element (\<bdi\>)  tells the browser's
 * bidirectional algorithm to treat the text it contains in isolation from its
 * surrounding text.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi)
 */
export const bdi = component("bdi");

/**
 * The HTML Bidirectional Text Override element (\<bdo\>) overrides the current
 * directionality of text, so that the text within is rendered in a different
 * direction.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo)
 */
export const bdo = component("bdo");

/**
 * The HTML \<br\> element produces a line break in text (carriage-return). It
 * is useful for writing a poem or an address, where the division of lines is
 * significant.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br)
 */
export const br = component("br");

/**
 * The HTML Citation element (\<cite\>) is used to describe a reference to a
 * cited creative work, and must include the title of that work.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite)
 */
export const cite = component("cite");

/**
 * The HTML \<code\> element displays its contents styled in a fashion intended
 * to indicate that the text is a short fragment of computer code.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code)
 */
export const code = component("code");

/**
 * The HTML \<data\> element links a given piece of content with a
 * machine-readable translation. If the content is time- or date-related, the
 * \<time\> element must be used.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data)
 */
export const data = component("data");

/**
 * The HTML Definition element (\<dfn\>) is used to indicate the term being
 * defined within the context of a definition phrase or sentence.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn)
 */
export const dfn = component("dfn");

/**
 * The HTML \<em\> element marks text that has stress emphasis. The \<em\>
 * element can be nested, with each level of nesting indicating a greater degree
 * of emphasis.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em)
 */
export const em = component("em");

/**
 * The HTML Idiomatic Text element (\<i\>) represents a range of text that is
 * set off from the normal text for some reason, such as idiomatic text,
 * technical terms, taxonomical designations, among others.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i)
 */
export const i = component("i");

/**
 * The HTML Keyboard Input element (\<kbd\>) represents a span of inline text
 * denoting textual user input from a keyboard, voice input, or any other text
 * entry device.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd)
 */
export const kbd = component("kbd");

/**
 * The HTML Mark Text element (\<mark\>) represents text which is marked or
 * highlighted for reference or notation purposes, due to the marked passage's
 * relevance or importance in the enclosing context.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
 */
export const mark = component("mark");

/**
 * The HTML \<q\> element indicates that the enclosed text is a short inline
 * quotation. Most modern browsers implement this by surrounding the text in
 * quotation marks.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)
 */
export const q = component("q");

/**
 * The HTML Ruby Base (\<rb\>) element is used to delimit the base text
 * component of a  \<ruby\> annotation, i.e. the text that is being annotated.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rb)
 */
export const rb = component("rb");

/**
 * The HTML Ruby Fallback Parenthesis (\<rp\>) element is used to provide
 * fall-back parentheses for browsers that do not support display of ruby
 * annotations using the \<ruby\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp)
 */
export const rp = component("rp");

/**
 * The HTML Ruby Text (\<rt\>) element specifies the ruby text component of a
 * ruby annotation, which is used to provide pronunciation, translation, or
 * transliteration information for East Asian typography. The \<rt\> element
 * must always be contained within a \<ruby\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt)
 */
export const rt = component("rt");

/**
 * The HTML Ruby Text Container (\<rtc\>) element embraces semantic annotations
 * of characters presented in a ruby of \<rb\> elements used inside of \<ruby\>
 * element. \<rb\> elements can have both pronunciation (\<rt\>) and semantic
 * (\<rtc\>) annotations.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rtc)
 */
export const rtc = component("rtc");

/**
 * The HTML \<ruby\> element represents small annotations that are rendered
 * above, below, or next to base text, usually used for showing the
 * pronunciation of East Asian characters. It can also be used for annotating
 * other kinds of text, but this usage is less common.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby)
 */
export const ruby = component("ruby");

/**
 * The HTML \<s\> element renders text with a strikethrough, or a line through
 * it. Use the \<s\> element to represent things that are no longer relevant or
 * no longer accurate. However, \<s\> is not appropriate when indicating
 * document edits; for that, use the \<del\> and \<ins\> elements, as
 * appropriate.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s)
 */
export const s = component("s");

/**
 * The HTML Sample Element (\<samp\>) is used to enclose inline text which
 * represents sample (or quoted) output from a computer program.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp)
 */
export const samp = component("samp");

/**
 * The HTML \<small\> element represents side-comments and small print, like
 * copyright and legal text, independent of its styled presentation. By default,
 * it renders text within it one font-size smaller, such as from small to
 * x-small.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small)
 */
export const small = component("small");

/**
 * The HTML \<span\> element is a generic inline container for phrasing content,
 * which does not inherently represent anything. It can be used to group
 * elements for styling purposes (using the class or id attributes), or because
 * they share attribute values, such as lang.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)
 */
export const span = component("span");

/**
 * The HTML Strong Importance Element (\<strong\>) indicates that its contents
 * have strong importance, seriousness, or urgency. Browsers typically render
 * the contents in bold type.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong)
 */
export const strong = component("strong");

/**
 * The HTML Subscript element (\<sub\>) specifies inline text which should be
 * displayed as subscript for solely typographical reasons.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub)
 */
export const sub = component("sub");

/**
 * The HTML Superscript element (\<sup\>) specifies inline text which is to be
 * displayed as superscript for solely typographical reasons.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup)
 */
export const sup = component("sup");

/**
 * The HTML \<time\> element represents a specific period in time.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
 */
export const time = component("time");

/**
 * The HTML Unarticulated Annotation element (\<u\>) represents a span of inline
 * text which should be rendered in a way that indicates that it has a
 * non-textual annotation.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u)
 */
export const u = component("u");

/**
 * The HTML Variable element (\<var\>) represents the name of a variable in a
 * mathematical expression or a programming context.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var)
 */
export const variable = component("var");

/**
 * The HTML \<wbr\> element represents a word break opportunity—a position
 * within text where the browser may optionally break a line, though its
 * line-breaking rules would not otherwise create a break at that location.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr)
 */
export const wbr = component("wbr");

/**
 * The HTML \<area\> element defines an area inside an image map that has
 * predefined clickable areas. An image map allows geometric areas on an image
 * to be associated with hypertext link.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area)
 */
export const area = component("area");

/**
 * The HTML \<audio\> element is used to embed sound content in documents. It
 * may contain one or more audio sources, represented using the src attribute or
 * the \<source\> element: the browser will choose the most suitable one. It can
 * also be the destination for streamed media, using a MediaStream.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
 */
export const audio = component("audio");

/**
 * The HTML \<img\> element embeds an image into the document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)
 */
export const img = component("img");

/**
 * The HTML \<map\> element is used with \<area\> elements to define an image
 * map (a clickable link area).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map)
 */
export const map = component("map");

/**
 * The HTML \<track\> element is used as a child of the media elements,
 * \<audio\> and \<video\>. It lets you specify timed text tracks (or time-based
 * data), for example to automatically handle subtitles.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track)
 */
export const track = component("track");

/**
 * The HTML Video element (\<video\>) embeds a media player which supports video
 * playback into the document. You can use \<video\> for audio content as well,
 * but the \<audio\> element may provide a more appropriate user experience.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
 */
export const video = component("video");

/**
 * The HTML \<embed\> element embeds external content at the specified point in
 * the document. This content is provided by an external application or other
 * source of interactive content such as a browser plug-in.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
 */
export const embed = component("embed");

/**
 * The HTML Inline Frame element (\<iframe\>) represents a nested browsing
 * context, embedding another HTML page into the current one.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)
 */
export const iframe = component("iframe");

/**
 * The HTML \<object\> element represents an external resource, which can be
 * treated as an image, a nested browsing context, or a resource to be handled
 * by a plugin.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object)
 */
export const object = component("object");

/**
 * The HTML \<param\> element defines parameters for an \<object\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param)
 */
export const param = component("param");

/**
 * The HTML \<picture\> element contains zero or more \<source\> elements and
 * one \<img\> element to offer alternative versions of an image for different
 * display/device scenarios.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture)
 */
export const picture = component("picture");

/**
 * The HTML \<source\> element specifies multiple media resources for the
 * \<picture\>, the \<audio\> element, or the \<video\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source)
 */
export const source = component("source");

/**
 * Use the HTML \<canvas\> element with either the canvas scripting API or the
 * WebGL API to draw graphics and animations.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)
 */
export const canvas = component("canvas");

/**
 * The HTML \<noscript\> element defines a section of HTML to be inserted if a
 * script type on the page is unsupported or if scripting is currently turned
 * off in the browser.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
 */
export const noscript = component("noscript");

/**
 * The HTML \<script\> element is used to embed executable code or data; this is
 * typically used to embed or refer to JavaScript code.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
 */
export const script = component("script");

/**
 * The HTML \<del\> element represents a range of text that has been deleted
 * from a document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del)
 */
export const del = component("del");

/**
 * The HTML \<ins\> element represents a range of text that has been added to a
 * document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins)
 */
export const ins = component("ins");

/**
 * The HTML \<caption\> element specifies the caption (or title) of a table.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption)
 */
export const caption = component("caption");

/**
 * The HTML \<col\> element defines a column within a table and is used for
 * defining common semantics on all common cells. It is generally found within
 * a \<colgroup\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col)
 */
export const col = component("col");

/**
 * The HTML \<colgroup\> element defines a group of columns within a table.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup)
 */
export const colgroup = component("colgroup");

/**
 * The HTML \<table\> element represents tabular data — that is, information
 * presented in a two-dimensional table comprised of rows and columns of cells
 * containing data.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
 */
export const table = component("table");

/**
 * The HTML Table Body element (\<tbody\>) encapsulates a set of table rows
 * (\<tr\> elements), indicating that they comprise the body of the table
 * (\<table\>).
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody)
 */
export const tbody = component("tbody");

/**
 * The HTML \<td\> element defines a cell of a table that contains data. It
 * participates in the table model.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td)
 */
export const td = component("td");

/**
 * The HTML \<tfoot\> element defines a set of rows summarizing the columns of
 * the table.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot)
 */
export const tfoot = component("tfoot");

/**
 * The HTML \<th\> element defines a cell as header of a group of table cells.
 * The exact nature of this group is defined by the scope and headers
 * attributes.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)
 */
export const th = component("th");

/**
 * The HTML \<thead\> element defines a set of rows defining the head of the
 * columns of the table.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead)
 */
export const thead = component("thead");

/**
 * The HTML \<tr\> element defines a row of cells in a table. The row's cells
 * can then be established using a mix of \<td\> (data cell) and \<th\> (header
 * cell) elements.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr)
 */
export const tr = component("tr");

/**
 * The HTML \<button\> element represents a clickable button, used to submit
 * forms or anywhere in a document for accessible, standard button
 * functionality.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
 */
export const button = component("button");

/**
 * The HTML \<datalist\> element contains a set of \<option\> elements that
 * represent the permissible or recommended options available to choose from
 * within other controls.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist)
 */
export const datalist = component("datalist");

/**
 * The HTML \<fieldset\> element is used to group several controls as well as
 * labels (\<label\>) within a web form.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset)
 */
export const fieldset = component("fieldset");

/**
 * The HTML \<form\> element represents a document section containing
 * interactive controls for submitting information.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
 */
export const form = component("form");

/**
 * The HTML \<input\> element is used to create interactive controls for
 * web-based forms in order to accept data from the user; a wide variety of
 * types of input data and control widgets are available, depending on the
 * device and user agent.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
 */
export const input = component("input");

/**
 * The HTML \<label\> element represents a caption for an item in a user
 * interface.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)
 */
export const label = component("label");

/**
 * The HTML \<legend\> element represents a caption for the content of its
 * parent \<fieldset\>.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend)
 */
export const legend = component("legend");

/**
 * The HTML \<meter\> element represents either a scalar value within a known
 * range or a fractional value.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter)
 */
export const meter = component("meter");

/**
 * The HTML \<optgroup\> element creates a grouping of options within a
 * \<select\> element.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup)
 */
export const optgroup = component("optgroup");

/**
 * The HTML \<option\> element is used to define an item contained in a
 * \<select\>, an \<optgroup\>, or a \<datalist\> element. As such, \<option\>
 * can represent menu items in popups and other lists of items in an HTML
 * document.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option)
 */
export const option = component("option");

/**
 * The HTML Output element (\<output\>) is a container element into which a site
 * or app can inject the results of a calculation or the outcome of a user
 * action.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output)
 */
export const output = component("output");

/**
 * The HTML \<progress\> element displays an indicator showing the completion
 * progress of a task, typically displayed as a progress bar.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress)
 */
export const progress = component("progress");

/**
 * The HTML \<select\> element represents a control that provides a menu of
 * options
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
 */
export const select = component("select");

/**
 * The HTML \<textarea\> element represents a multi-line plain-text editing
 * control, useful when you want to allow users to enter a sizeable amount of
 * free-form text, for example a comment on a review or feedback form.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
 */
export const textarea = component("textarea");

/**
 * The HTML Details Element (\<details\>) creates a disclosure widget in which
 * information is visible only when the widget is toggled into an "open" state.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)
 */
export const details = component("details");

/**
 * The HTML \<dialog\> element represents a dialog box or other interactive
 * component, such as a dismissable alert, inspector, or subwindow.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
 */
export const dialog = component("dialog");

/**
 * The HTML \<menu\> element represents a group of commands that a user can
 * perform or activate. This includes both list menus, which might appear across
 * the top of a screen, as well as context menus, such as those that might
 * appear underneath a button after it has been clicked.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu)
 */
export const menu = component("menu");

/**
 * The HTML Disclosure Summary element (\<summary\>) element specifies a
 * summary, caption, or legend for a \<details\> element's disclosure box.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary)
 */
export const summary = component("summary");
