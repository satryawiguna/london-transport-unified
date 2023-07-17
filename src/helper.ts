export const generateTagTranslation = (text: string, prefix: string): string => {
    return prefix + "." + text.replace(/\W+/g, '_').toLowerCase()
}

export const generateTagLabel = (text: string): string => {
    return text.replace(/\W+/g, ' ').toUpperCase()
}

export const htmlDecode = (content: string) => {
    const e = document.createElement('div')

    e.innerHTML = content

    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
