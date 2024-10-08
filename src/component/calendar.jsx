/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfToday
} from 'date-fns';
import { useState } from 'react';

function calendar() {
  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7'
  ];
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth)
  });

  return (
    <div className="">
      <div className="bg-[#18181B] rounded-lg p-8">
        <div className="flex flex-col">
          <h2 className="flex-auto font-semibold text-white lowercase">
            {format(firstDayCurrentMonth, 'MMMM yyyy')}
          </h2>
          <time
            className="text-white font-bold lowercase"
            dateTime={format(selectedDay, 'yyyy-MM-dd')}
          >
            selected: {format(selectedDay, 'MMM dd, yyy')}
          </time>
        </div>
        <div className="grid grid-cols-7 mt-2 text-xs leading-6 font-bold text-center text-[#C7264D]">
          <div>s</div>
          <div>m</div>
          <div>t</div>
          <div>w</div>
          <div>t</div>
          <div>f</div>
          <div>s</div>
        </div>
        <div className="grid grid-cols-7 mt-2 text-sm">
          {days.map((day, dayIdx) => (
            <div
              key={day.toString()}
              className={classNames(
                dayIdx === 0 && colStartClasses[getDay(day)],
                ''
              )}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
                className={classNames(
                  isEqual(day, selectedDay) && 'text-white',
                  !isEqual(day, selectedDay) &&
                    isToday(day) &&
                    'text-[#C7264D]',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    isSameMonth(day, firstDayCurrentMonth) &&
                    'text-white',
                  !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    'text-gray-400',
                  isEqual(day, selectedDay) && isToday(day) && 'bg-[#C7264D]',
                  isEqual(day, selectedDay) && !isToday(day) && 'bg-[#C7264D]',
                  !isEqual(day, selectedDay) && 'hover:bg-black',
                  (isEqual(day, selectedDay) || isToday(day)) &&
                    'font-semibold',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default calendar;
