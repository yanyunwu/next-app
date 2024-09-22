import QuillImage from 'quill/formats/image'


export default class Image extends QuillImage {

  static create(value: string) {
    const node = super.create(value)
    node.removeAttribute('height')
    return node
  }

  static match(url: string) {
    return !!url
  }

  static sanitize(url: string) {
    return url
  }
}