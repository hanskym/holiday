import Link from 'next/link';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import type { GetHolidayEntriesResponse } from '@/types/holiday';

import { NEXT_BASE_URL } from '@/lib/constants';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export default async function HomePage() {
  const response = await fetch(`${NEXT_BASE_URL}/api/holidays`, {
    cache: 'no-store',
  });
  const { data } = await response.json();
  const holidays: GetHolidayEntriesResponse = data;

  const todayHoliday = await getTodayHoliday(holidays);
  const nextHolidays = await getUpcomingHolidays(holidays, 4);

  const upcomingHolidays = todayHoliday ? nextHolidays.slice(0, 3) : nextHolidays.slice(1, 4);
  const nextHoliday = todayHoliday ? nextHolidays[0] : nextHolidays[0];

  return (
    <div className="relative mx-auto flex w-full flex-col justify-center 2xl:max-w-7xl">
      {/* <!-- Starts component --> */}
      <div className="container mx-auto max-w-6xl space-y-4 px-4">
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-neutral-100 p-8">
          <div className="grid sm:grid-cols-2">
            <div className="relative z-10 flex flex-col justify-between space-y-4 lg:space-y-6">
              <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border">
                <svg
                  className="m-auto size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 15 15"
                >
                  <path
                    d="M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">
                  {format(new Date(), 'EEEE, dd MMMM yyyy', { locale: id })}
                </h1>
                {todayHoliday ? (
                  <>
                    <h2 className="mb-6 text-3xl font-semibold">Hari Ini Libur!</h2>
                    <p className="text-xl text-gray-800">{todayHoliday.holiday_name}</p>
                  </>
                ) : nextHoliday ? (
                  <>
                    <h2 className="mb-6 text-3xl font-semibold">Kapan hari libur terdekat?</h2>
                    <p className="text-xl text-gray-800">
                      {nextHoliday.holiday_name} -{' '}
                      {format(new Date(nextHoliday.holiday_date), 'EEEE, dd MMMM yyyy', {
                        locale: id,
                      })}
                      <br />
                      <span className="text-base text-gray-600">
                        {nextHoliday.daysUntil} hari lagi
                      </span>
                    </p>
                  </>
                ) : (
                  <h2 className="mb-6 text-3xl font-semibold">Tidak ada hari libur mendatang</h2>
                )}
              </div>
            </div>
            <div className="relative mt-6 -mr-[34px] -mb-[34px] h-fit overflow-hidden rounded-tl-lg border p-6 py-6 sm:mt-auto sm:ml-6">
              <div className="absolute top-2 left-3 flex gap-1">
                <span className="block size-2 rounded-full border"></span>
                <span className="block size-2 rounded-full border"></span>
                <span className="block size-2 rounded-full border"></span>
              </div>
              {todayHoliday ? (
                <span className="size-12">🏖️</span>
              ) : (
                <span className="size-12">⏳</span>
              )}
            </div>
          </div>
        </div>

        <div className="relative rounded-xl border border-gray-200 bg-neutral-100 p-4">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <h2 className="text-lg font-medium text-gray-800">Libur Nasional Berikutnya</h2>
            <Link href="/year">
              <button className="cursor-pointer rounded-2xl border-none bg-[#141417] px-4 py-2 text-center text-sm font-normal text-white sm:w-auto md:text-base">
                Lihat Semua
              </button>
            </Link>
          </div>

          <div className="relative z-10 mt-4 grid grid-cols-6 gap-3">
            {upcomingHolidays.map((holiday, index) => (
              <div
                key={holiday.holiday_date.toString()}
                className="group col-span-full md:col-span-2"
              >
                <div className="flex size-full flex-col rounded-2xl border border-gray-200 bg-[#fefefe] p-2 text-[#141417] transition-all duration-300 hover:border-black">
                  <div className="flex-grow space-y-8 rounded-t-lg bg-[#fef4e2] p-6 text-sm">
                    <div className="flex flex-nowrap items-center justify-between gap-4 font-bold">
                      <span className="font-mono text-4xl font-semibold text-gray-800">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-semibold">{holiday.holiday_name}</h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3 text-sm font-medium">
                    <p className="flex items-center gap-3">
                      {format(new Date(holiday.holiday_date), 'EEEE, dd MMMM yyyy', {
                        locale: id,
                      })}
                    </p>
                    <p>{holiday.daysUntil} hari lagi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
