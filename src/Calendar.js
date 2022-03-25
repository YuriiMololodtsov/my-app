import './index.css';

let resultMon;

const arrMonth = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export default function Calendar() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  //------------------------------------
  function range(count) {
    let arr = [];

    for (let i = 1; i <= count; i++) {
      arr.push(i);
    }

    return arr;
  }
  //-------------------------------------
  function getLastDay(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
  }
  //-------------------------------------
  function getFirstWeekDay(year, month) {
    let date = new Date(year, month, 1);
    let num = date.getDay();

    if (num == 0) {
      return 6;
    } else {
      return num - 1;
    }
  }

  function getLastWeekDay(year, month) {
    let date = new Date(year, month + 1, 0);
    let num = date.getDay();

    if (num == 0) {
      return 6;
    } else {
      return num - 1;
    }
  }
  //----------------------------------------

  function normalize(arr, left, right) {
    for (let i = 0; i < left; i++) {
      arr.unshift('');
    }
    for (var i = 0; i < right; i++) {
      arr.push('');
    }

    return arr;
  }
  //----------------------------------------

  function chunk(arr, n) {
    let result = [];
    let count = Math.ceil(arr.length / n);

    for (let i = 0; i < count; i++) {
      let elems = arr.splice(0, n);
      result.push(elems);
    }

    return result;
  }
  //

  let rows = draw(year, month);

  //
  //-------------------отрисовка---------------

  function draw(year, month) {
    let arr = range(getLastDay(year, month));

    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay = getLastWeekDay(year, month);

    let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);

    const rows = nums.map((item, index) => {
      return (
        <tr key={index}>
          {item.map((elem, index2) =>
            date.getDate() != elem ? (
              <td key={index2}>{elem}</td>
            ) : (
              <td className="monDay" key={index2}>
                {elem}
              </td>
            )
          )}
        </tr>
      );
    });
    return rows;
  }

  //------------------------------------------------
  //month

  //   function changeMonth(num) {
  //     for (let i = 0; i < arrMonth.length; i++) {
  //       if (i == num) {
  //         return (resultMon = arrMonth[i]);
  //       }
  //     }
  //     return resultMon;
  //   }
  //   const headerMonth = changeMonth(date.getMonth());
  //-----------------nav--------------------------

  //---------------smena-----------------------
  //
  function getNextYear(year, month) {
    if (month == 11) {
      return year + 1;
    } else return year;
  }

  function getNextMonth(month) {
    if (month != 11) {
      return month + 1;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className="header">
        <button className="header__btn-nav">&#9668;</button>
        <h2>1</h2>
        <button
          className="header__btn-nav"
          onClick={() => {
            rows = draw(getNextYear(year, month), getNextMonth(month));
            console.log(rows);
          }}
        >
          &#9658;
        </button>
      </div>
      <div id="parent">
        <div id="calendar">
          <table>
            <thead>
              <tr>
                <th>пн</th>
                <th>вт</th>
                <th>ср</th>
                <th>чт</th>
                <th>пт</th>
                <th>сб</th>
                <th>вс</th>
              </tr>
            </thead>
            <tbody className="body">{rows}</tbody>
          </table>
        </div>
      </div>
      <div className="note"></div>
    </>
  );
}
