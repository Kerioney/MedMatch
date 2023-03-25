const paginate = async (query, currentPage, perPage) => {
    const count = await query.countDocuments()
    const totalItems = count
    const totalPages = Math.ceil(totalItems / perPage)
    const nextPage = currentPage < totalPages ? currentPage + 1 : null
    const prevPage = currentPage > 1 ? currentPage - 1 : null
    const results = await query.skip((currentPage - 1) * perPage).limit(perPage)
    return {
        totalItems,
        totalPages,
        nextPage,
        prevPage,
        results,
    }
}

module.exports = paginate
