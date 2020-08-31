export const timeCountDown = (endTime) => {
  const getTime = new Date(endTime).getTime() - Date.now();
  if (getTime < 0) {
    return null;
  }
  const realDates = getTime / 86400 / 1000;
  const getDates = Math.floor(realDates);
  const realHours = (realDates - getDates) * 24;
  const getHours = Math.floor(realHours);
  const realMinutes = (realHours - getHours) * 60;
  const getMinutes = Math.floor(realMinutes);
  const getSeconds = Math.floor((realMinutes - getMinutes) * 60);
  let d = getDates;
  let h = getHours;
  let m = getMinutes;
  let s = getSeconds;
  if (d == 0) {
    d = "";
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  const timeString = d
    ? `${d} ngày:${h} giờ:${m} phút:${s} giây`
    : `${h} giờ:${m} phút:${s} giây`;
  return {
    dates: d,
    hours: h,
    minutes: m,
    seconds: s,
    timeString,
  };
};

export const generatePagination = (currentPage, numPages) => {
  let listPages = [];
  if (numPages < 4) {
    for (let i = 1; i <= numPages; i++) {
      listPages.push(i);
    }
  } else if (currentPage === 1) {
    listPages = [
      { to: currentPage, text: currentPage },
      { to: currentPage + 1, text: `${currentPage + 1}` },
      { to: currentPage + 2, text: `${currentPage + 2}` },
      { to: currentPage + 3, text: `${currentPage + 3}` },
      { to: "nextExtends", text: "..." },
    ];
    listPages.push({ to: numPages, text: numPages });
  } else if (currentPage === numPages) {
    listPages = [
      { to: 1, text: 1 },
      { to: "prevExtends", text: "..." },
      { to: currentPage - 3, text: `${currentPage - 3}` },
      { to: currentPage - 2, text: `${currentPage - 2}` },
      { to: currentPage - 1, text: `${currentPage - 1}` },
      { to: currentPage, text: `${currentPage}` },
    ];
  } else if (currentPage - 1 === 1) {
    listPages = [
      { to: currentPage - 1, text: `${currentPage - 1}` },
      { to: currentPage, text: `${currentPage}` },
      { to: currentPage + 1, text: `${currentPage + 1}` },
      { to: currentPage + 2, text: `${currentPage + 2}` },
    ];
    if (currentPage + 3 === numPages) {
      listPages.push({ to: currentPage + 3, text: `${currentPage + 3}` });
    } else {
      listPages.push({ to: "nextExtends", text: "..." });
      listPages.push({ to: numPages, text: numPages });
    }
  } else if (currentPage + 1 === numPages) {
    listPages = [
      { to: 1, text: 1 },
      { to: "prevExtends", text: "..." },
      { to: currentPage - 2, text: `${currentPage - 2}` },
      { to: currentPage - 1, text: `${currentPage - 1}` },
      { to: currentPage, text: `${currentPage}` },
      { to: currentPage + 1, text: `${currentPage + 1}` },
    ];
  } else {
    if (currentPage - 2 <= 1 && currentPage + 2 <= numPages) {
      for (let i = 1; i <= currentPage + 2; i++) {
        listPages.push({ to: i, text: i });
      }
      if (currentPage + 2 < numPages - 1) {
        listPages.push({ to: "nextExtends", text: "..." });
        listPages.push({ to: numPages, text: numPages });
      }
    } else if (currentPage - 2 <= 1 && currentPage + 2 >= numPages) {
      for (let i = 1; i <= numPages; i++) {
        listPages.push({ to: i, text: i });
      }
    } else if (currentPage - 2 >= 1 && currentPage + 2 >= numPages) {
      if (currentPage - 2 > 1) {
        listPages.push({ to: 1, text: 1 });
        listPages.push({ to: "prevExtends", text: "..." });
      }
      for (let i = currentPage - 2; i <= numPages; i++) {
        listPages.push({ to: i, text: i });
      }
    } else {
      listPages.push({ to: 1, text: 1 });
      listPages.push({ to: "prevExtends", text: "..." });
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        listPages.push({ to: i, text: i });
      }
      listPages.push({ to: "nextExtends", text: "..." });
      listPages.push({ to: numPages, text: numPages });
    }
  }
  return listPages;
};

export const listNextExtends = (listPages, currentPage, numPages) => {
  let list = [...listPages];
  if (list.length > 6) {
    list = list.filter(
      (_, idx) =>
        list[idx].to === currentPage ||
        list[idx].to === "prevExtends" ||
        idx > 3
    );
  }

  let maxPageInList = list[list.length - 3].to;
  if (maxPageInList + 3 < numPages) {
    for (let i = maxPageInList + 1; i <= maxPageInList + 3; i++) {
      list.splice(list.length - 2, 0, { to: i, text: i });
    }
  } else {
    for (let i = maxPageInList + 1; i < numPages; i++) {
      list.splice(list.length - 2, 0, { to: i, text: i });
    }
    list.splice(list.length - 2, 1);
  }
  if (list.includes((item) => item.to !== 2)) {
    list.splice(1, 0, { to: "prevExtends", text: "..." });
  }

  if (list[0].to != 1) {
    list.unshift({ to: 1, text: 1 });
  }
  return list;
};

export const listPrevExtends = (listPages, currentPage, numPages) => {
  let list = [...listPages];
  if (list.length > 8) {
    list = list.filter(
      (_, idx) =>
        list[idx].to === currentPage ||
        list[idx].to === "nextExtends" ||
        idx < list.length - 3
    );
  }

  let minPageInList = list[2].to;
  if (minPageInList - 3 > 1) {
    for (let i = minPageInList - 1; i >= minPageInList - 3; i--) {
      list.splice(2, 0, { to: i, text: i });
    }
  } else {
    for (let i = minPageInList - 1; i > 1; i--) {
      list.splice(2, 0, { to: i, text: i });
    }
    list.splice(1, 1);
  }
  if (list.includes((item) => item.to !== list.length - 2)) {
    list.splice(list.length - 2, 0, { to: "nextExtends", text: "..." });
  }
  return list;
};
