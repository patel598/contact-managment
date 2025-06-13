
const MetaTag = (description, keyword) => {
    return (
        <>
            <meta name="keyword" content={keyword} />
            <meta name="description" content={description} />
        </>
    )
}

export default MetaTag