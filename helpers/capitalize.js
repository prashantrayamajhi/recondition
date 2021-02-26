module.exports = (value) => {
    value = value.trim()
    value = value.toLowerCase()
    value = value.charAt(0).toUpperCase() + value.slice(1)
    return value
}
