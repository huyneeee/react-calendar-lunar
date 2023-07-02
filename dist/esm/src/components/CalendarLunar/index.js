import { useEffect } from 'react';
import React from 'react';
import './calendar.css';
import { DAYNAMES, LE, MONTHS, TK13, TK14, TK15, TK16, TK17, TK18, TK19, TK20, TK21, TK22, } from '../../../constant';
export const CalendarLunar = ({ onClick }) => {
    const FIRST_DAY = jdn(31, 1, 1200);
    const LAST_DAY = jdn(31, 12, 2199);
    var settings = {}, today = new Date(), currentMonth = today.getMonth() + 1, currentYear = today.getFullYear();
    function INT(d) {
        return Math.floor(d);
    }
    function LunarDate(day, month, year, leap, jd) {
        return {
            day,
            month,
            year,
            leap,
            jd,
        };
    }
    function jdn(dd, mm, yy) {
        var a = INT((14 - mm) / 12);
        var y = yy + 4800 - a;
        var m = mm + 12 * a - 3;
        var jd = dd +
            INT((153 * m + 2) / 5) +
            365 * y +
            INT(y / 4) -
            INT(y / 100) +
            INT(y / 400) -
            32045;
        return jd;
        //return 367*yy - INT(7*(yy+INT((mm+9)/12))/4) - INT(3*(INT((yy+(mm-9)/7)/100)+1)/4) + INT(275*mm/9)+dd+1721029;
    }
    function decodeLunarYear(yy, k) {
        var monthLengths, regularMonths, offsetOfTet, leapMonth, leapMonthLength, solarNY, currentJD, j, mm;
        var ly = [];
        monthLengths = [29, 30];
        regularMonths = new Array(12);
        offsetOfTet = k >> 17;
        leapMonth = k & 0xf;
        leapMonthLength = monthLengths[(k >> 16) & 0x1];
        solarNY = jdn(1, 1, yy);
        currentJD = solarNY + offsetOfTet;
        j = k >> 4;
        for (let i = 0; i < 12; i++) {
            regularMonths[12 - i - 1] = monthLengths[j & 0x1];
            j >>= 1;
        }
        if (leapMonth == 0) {
            for (mm = 1; mm <= 12; mm++) {
                ly.push(LunarDate(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm - 1];
            }
        }
        else {
            for (mm = 1; mm <= leapMonth; mm++) {
                ly.push(LunarDate(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm - 1];
            }
            ly.push(LunarDate(1, leapMonth, yy, 1, currentJD));
            currentJD += leapMonthLength;
            for (mm = leapMonth + 1; mm <= 12; mm++) {
                ly.push(LunarDate(1, mm, yy, 0, currentJD));
                currentJD += regularMonths[mm - 1];
            }
        }
        return ly;
    }
    function getYearInfo(yyyy) {
        var yearCode;
        if (yyyy < 1300) {
            yearCode = TK13[yyyy - 1200];
        }
        else if (yyyy < 1400) {
            yearCode = TK14[yyyy - 1300];
        }
        else if (yyyy < 1500) {
            yearCode = TK15[yyyy - 1400];
        }
        else if (yyyy < 1600) {
            yearCode = TK16[yyyy - 1500];
        }
        else if (yyyy < 1700) {
            yearCode = TK17[yyyy - 1600];
        }
        else if (yyyy < 1800) {
            yearCode = TK18[yyyy - 1700];
        }
        else if (yyyy < 1900) {
            yearCode = TK19[yyyy - 1800];
        }
        else if (yyyy < 2000) {
            yearCode = TK20[yyyy - 1900];
        }
        else if (yyyy < 2100) {
            yearCode = TK21[yyyy - 2000];
        }
        else {
            yearCode = TK22[yyyy - 2100];
        }
        return decodeLunarYear(yyyy, yearCode);
    }
    function findLunarDate(jd, ly) {
        if (jd > LAST_DAY || jd < FIRST_DAY || ly[0].jd > jd) {
            return LunarDate(0, 0, 0, 0, jd);
        }
        var i = ly.length - 1;
        while (jd < ly[i].jd) {
            i--;
        }
        var off = jd - ly[i].jd;
        const ret = LunarDate(ly[i].day + off, ly[i].month, ly[i].year, ly[i].leap, jd);
        return ret;
    }
    function getMonth(mm, yy) {
        var ly1, ly2, tet1, jd1, jd2, mm1, yy1, result, i;
        if (mm < 12) {
            mm1 = mm + 1;
            yy1 = yy;
        }
        else {
            mm1 = 1;
            yy1 = yy + 1;
        }
        jd1 = jdn(1, mm, yy);
        jd2 = jdn(1, mm1, yy1);
        ly1 = getYearInfo(yy);
        tet1 = ly1[0].jd;
        result = [];
        if (tet1 <= jd1) {
            /* tet(yy) = tet1 < jd1 < jd2 <= 1.1.(yy+1) < tet(yy+1) */
            for (i = jd1; i < jd2; i++) {
                result.push(findLunarDate(i, ly1));
            }
        }
        else if (jd1 < tet1 && jd2 < tet1) {
            /* tet(yy-1) < jd1 < jd2 < tet1 = tet(yy) */
            ly1 = getYearInfo(yy - 1);
            for (i = jd1; i < jd2; i++) {
                result.push(findLunarDate(i, ly1));
            }
        }
        else if (jd1 < tet1 && tet1 <= jd2) {
            /* tet(yy-1) < jd1 < tet1 <= jd2 < tet(yy+1) */
            ly2 = getYearInfo(yy - 1);
            for (i = jd1; i < tet1; i++) {
                result.push(findLunarDate(i, ly2));
            }
            for (i = tet1; i < jd2; i++) {
                result.push(findLunarDate(i, ly1));
            }
        }
        return result;
    }
    function printMonth(mm, yy) {
        var res = '';
        res += printTable(mm, yy);
        return res;
    }
    function printTable(mm, yy) {
        var i, j, k, solar;
        var currentMonth = getMonth(mm, yy);
        if (currentMonth.length == 0)
            return false;
        var ld1 = currentMonth[0];
        var emptyCells = (ld1.jd + 1) % 7;
        var res = '';
        res +=
            '<table class="amlich" border="0" cellpadding="0" cellspacing="0" width="' +
                (settings === null || settings === void 0 ? void 0 : settings.tableWidth) +
                '">\n';
        res += '<tbody>\n';
        res += printHead(mm, yy);
        for (i = 0; i < 6; i++) {
            res += '<tr>\n';
            for (j = 0; j < 7; j++) {
                k = 7 * i + j;
                if (k < emptyCells || k >= emptyCells + currentMonth.length) {
                    res += '<td class="ngaythang">\n';
                    res += '  <div class="cn">&nbsp;</div>\n';
                    res += '  <div class="am">&nbsp;</div>\n';
                    res += '</td>\n';
                }
                else {
                    solar = k - emptyCells + 1;
                    ld1 = currentMonth[k - emptyCells];
                    res += printCell(ld1, solar, mm, yy);
                }
            }
            res += '</tr>\n';
        }
        res += '</tbody>\n';
        res += '</table>\n';
        return res;
    }
    function getPrevMonthLink(mm, yy) {
        var mm1 = mm > 1 ? mm - 1 : 12;
        var yy1 = mm > 1 ? yy : yy - 1;
        return `<a class="prev-month" data-yy="${yy1}" data-mm="${mm1}" href="#">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"/></svg>
    </a>`;
    }
    function getNextMonthLink(mm, yy) {
        var mm1 = mm < 12 ? mm + 1 : 1;
        var yy1 = mm < 12 ? yy : yy + 1;
        return ('<a class="next-month" data-yy="' +
            yy1 +
            '" data-mm="' +
            mm1 +
            '" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"/></svg></a>');
    }
    function printHead(mm, yy) {
        var res = '';
        var monthName = MONTHS[mm - 1] + ' ' + yy;
        res += '<tr class="t-head" >\n';
        res +=
            '  <td colspan="2" class="navi-l">' +
                getPrevMonthLink(mm, yy) +
                '</td>\n';
        res += '  <td colspan="3" class="tenthang">' + monthName + '</td>\n';
        res +=
            '  <td colspan="2" class="navi-r">' +
                getNextMonthLink(mm, yy) +
                '</td></tr>\n';
        res += '</tr>\n';
        res += '<tr>\n';
        for (var i = 0; i <= 6; i++) {
            res += '  <td class="ngaytuan">' + DAYNAMES[i] + '</td>\n';
        }
        res += '</tr>\n';
        return res;
    }
    function checkHolidaySolar(dd, mm) {
        var res = '';
        LE.solar.forEach((item) => {
            if (item.d == dd && item.m == mm) {
                res = item.i + ' (' + item.d + '/' + item.m + ' DL)';
                return false;
            }
        });
        return res;
    }
    function checkHolidayLunar(dd, mm) {
        var res = '';
        LE.lunar.forEach((item) => {
            if (item.d == dd && item.m == mm) {
                res = item.i + ' (' + item.d + '/' + item.m + ' ÂL)';
                return false;
            }
        });
        return res;
    }
    function printCell(lunarDate, solarDate, solarMonth, solarYear) {
        // var cellClass, solarClass, lunarClass, solarColor,
        let cellClass = 'ngaythang';
        let solarClass = 't2t6';
        let lunarClass = 'am';
        let title, tmp = '';
        const dow = (lunarDate.jd + 1) % 7;
        if (dow == 0) {
            solarClass = 'cn';
            // solarColor = "red";
        }
        else if (dow == 6) {
            solarClass = 't7';
            // solarColor = "green";
        }
        const isToday = solarDate == today.getDate() &&
            solarMonth == today.getMonth() + 1 &&
            solarYear == today.getFullYear();
        if (solarDate == today.getDate() &&
            solarMonth == today.getMonth() + 1 &&
            solarYear == today.getFullYear()) {
            cellClass = 'homnay';
        }
        tmp = checkHolidayLunar(lunarDate.day, lunarDate.month);
        if (tmp != '') {
            cellClass = 'leam';
            if (isToday) {
                cellClass = 'leduong homnay';
            }
            title = tmp;
        }
        tmp = checkHolidaySolar(solarDate, solarMonth);
        if (tmp != '') {
            cellClass = 'leduong';
            if (isToday) {
                cellClass = 'leduong homnay';
            }
            title = tmp;
        }
        if (lunarDate.day == 1 && lunarDate.month == 1) {
            cellClass = 'tet';
            if (isToday) {
                cellClass = 'leduong homnay';
            }
        }
        if (lunarDate.leap == 1) {
            lunarClass = 'am2';
            if (isToday) {
                cellClass = 'leduong homnay';
            }
        }
        var lunar = lunarDate.day;
        if (solarDate == 1 || lunar == 1) {
            lunar =
                lunarDate.day +
                    '/' +
                    lunarDate.month +
                    (lunarDate.leap == 1 ? '<sup>N</sup>' : '');
        }
        var res = '';
        const titleTooltip = title !== null && title !== void 0 ? title : '';
        var args = lunarDate.day +
            ',' +
            lunarDate.month +
            ',' +
            lunarDate.year +
            ',' +
            lunarDate.leap;
        args +=
            ',' + lunarDate.jd + ',' + solarDate + ',' + solarMonth + ',' + solarYear;
        res += '<td class="' + cellClass + '"';
        res +=
            lunarDate != null
                ? ' title="' + titleTooltip + '" data-args="' + args + '"'
                : '';
        res += '>\n';
        res += '  <div class="' + solarClass + '">' + solarDate + '</div>\n';
        res += '  <div class="' + lunarClass + '">' + lunar + '</div>\n';
        res += '</td>\n';
        return res;
    }
    useEffect(() => {
        var app = document.querySelector('.calendar-lunar');
        const result = printMonth(currentMonth, currentYear);
        app.innerHTML = result;
    }, []);
    useEffect(() => {
        const app = document.querySelector('.calendar-lunar');
        window.addEventListener('click', function (e) {
            const mm = +e.target.parentElement.dataset.mm;
            const yy = +e.target.parentElement.dataset.yy;
            if (e.target.parentElement.className === 'next-month' ||
                e.target.parentElement.className === 'prev-month') {
                const result = printMonth(mm, yy);
                app.innerHTML = result;
            }
        });
        return window.removeEventListener('click', function () { });
    }, []);
    return (React.createElement("div", { className: 'wrapper-calendar-lunar' },
        React.createElement("div", { className: 'calendar-lunar' })));
};
//# sourceMappingURL=index.js.map