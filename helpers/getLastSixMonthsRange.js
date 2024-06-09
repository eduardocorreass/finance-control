const getLastSixMonthsRange = () => {
    const now = new Date();

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    return { start: sixMonthsAgo, end: now };
};

module.exports = {
    getLastSixMonthsRange
};