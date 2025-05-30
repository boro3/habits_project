const calculateStreak = (dates) => {
    if (!dates || dates.length === 0) {
        return 0;
    }
    // Sort dates in ascending order
    dates.sort((a, b) => new Date(a) - new Date(b));

    let streak = 1;
    let currentDate = new Date(dates[0]);

    for (let i = 1; i < dates.length; i++) {
        const nextDate = new Date(dates[i]);
        const diffInDays = (nextDate - currentDate) / (1000 * 60 * 60 * 24);

        if (diffInDays === 1) {
            streak++;
            currentDate = nextDate;
        } else if (diffInDays > 1) {
            streak = 1;
            currentDate = nextDate;
        }
    }

    return streak;
};

module.exports = {
  calculateStreak
};