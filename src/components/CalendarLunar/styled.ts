import styled from 'styled-components';

export const WrapperLunar = styled.div`
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
  padding: 8px;
  border-radius: 12px;
  min-width: 350px;
  margin: 0 auto;
.amlich {
  border-collapse: collapse;
  font-size: 14px;
  font-family: Roboto, sans-serif;
  margin-bottom: 1.3rem;
  width: 100%;
}
.amlich .calendar-day {
  text-align: center;
  font-weight: 700;
}
.amlich .calendar-day .day-num {
  font-size: 80px;
  font-family: Roboto, sans-serif;
  line-height: 100%;
  color: #31708f;
}
.amlich .lunar-day-num {
  font-size: 44px;
  line-height: 100%;
  font-weight: 700;
  color: #3c763d;
}
.amlich .calendar-holiday {
  color: #f89696;
  font-weight: 700;
}
.amlich a {
  text-decoration: none;
  color: #a165f0;
  display: block;
}
.amlich .tenthang {
  text-shadow: 0 0 3px #000;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.4rem;
  color: #a165f0;
  text-shadow: none;
}
.amlich .navi-l {
  font-size: 12px;
  text-align: left;
}
.amlich .navi-r {
  font-size: 12px;
  text-align: right;
}
.amlich .ngaytuan {
  text-align: center;
  color: #949494;
  padding: 3px;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.3rem;
  flex: 1;
}
.amlich .ngaythang {
  color: #5a5c5b;
}
.amlich tr:nth-child(odd) td.ngaythang:nth-child(2n) {
  background-color: #fff;
}
.amlich tr:nth-child(2n) td.ngaythang:nth-child(odd) {
  background-color: #fff;
}
.amlich tr td.ngaythang:hover {
  background-color: #f5f5f5 !important;
}
.amlich .homnay {
  border: 1.5px solid #f89696;
  border-radius: 15px;
  color: #f89696;
  font-weight: 500;
}
.amlich .homnay > .t2t6 {
  color: #f89696;
}
.amlich .am {
  font-weight: 200;
  font-size: 10px;
  line-height: 1rem;
  text-align: right;
  color: #909090;
  position: absolute;
  right: 10%;
  top: 7%;
}
.amlich .am2 {
  text-align: right;
  font-size: 75%;
  color: #494949;
}
.amlich .t2t6 {
  font-size: 1rem;
  line-height: 1.3rem;
  text-align: left;
  font-weight: 500;
  color: #494949;
}
.amlich .t7 {
  font-size: 1rem;
  line-height: 1.3rem;
  text-align: left;
}
.amlich .cn {
  font-size: 1rem;
  line-height: 1.3rem;
  text-align: left;
}
.amlich tbody {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 5px;
}
.amlich tbody tr {
  display: flex;
  gap: 5px;
  justify-content: space-between;
}
.amlich .homnay,
.amlich .leam,
.amlich .leduong,
.amlich .ngaythang,
.amlich .tet {
  position: relative;
  width: calc(100% / 7);
  cursor: pointer;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}
.amlich .homnay > div,
.amlich .leam > div,
.amlich .leduong > div,
.amlich .ngaythang > div,
.amlich .tet > div {
  border-radius: 15px;
  overflow: hidden;
}
.amlich .leam::after,
.amlich .leduong::after,
.amlich .tet::after {
  content: '';
  width: 6px;
  height: 6px;
  background: #ff5d73;
  border-radius: 50%;
  position: absolute;
  top: 70%;
}
.amlich .leam:hover,
.amlich .leduong:hover,
.amlich .tet:hover {
  background-color: #f5f5f5;
}
.calendar {
  font-size: 12px;
}
.calendar td {
  background-color: #e9eff3;
}
.calendar-month {
  background-color: #1e8cbe !important;
  color: #fff;
  text-shadow: 0 0 3px #000;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 14px !important;
}
.amlich-tennam {
  text-align: center;
  font-weight: 700;
  color: #000;
  background-color: #ccc;
  font-size: 14px;
  font-family: Roboto, sans-serif;
}
.t-head {
  border-bottom: 1px solid #dcdcdc;
  margin: 15px 0px;
  padding: 15px 0px;
}
.text {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3rem;
}
.title-canlendar {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.3rem;
  color: #424241;
  text-align: center;
}

.date-select {
  background-color: #ff5d73;
}
.amlich .date-select .t2t6,
.amlich .date-select .t7,
.amlich .date-select .cn,
.amlich .date-select .am {
  color: #fff;
}

.amlich tr td.date-select:hover {
  background-color: #ff5d73 !important;
}

.amlich .date-select.leam::after,
.amlich .date-select.leduong::after,
.amlich .date-select.tet::after {
  content: '';
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 70%;
}

`