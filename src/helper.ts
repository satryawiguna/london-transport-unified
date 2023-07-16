export const generateTagTranslation = (text: string, prefix: string): string => {
    return prefix + "." + text.replace(/\W+/g, '_').toLowerCase()
}
