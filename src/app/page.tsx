import type { Metadata } from 'next';

import TodayHoliday from '@/components/TodayHoliday';
import UpcomingHolidays from '@/components/UpcomingHolidays';

import { siteConfig } from '@/config/site';
import { fetchHolidays } from '@/lib/fetch';
import { getTodayHoliday, getUpcomingHolidays } from '@/lib/parser';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: `Cek Hari Libur Sekarang | ${siteConfig.name}`,
};

export default async function HomePage() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  let { data: allHolidays, lastFetch } = await fetchHolidays(currentYear);
  const upcomingHolidayCount = 4;

  const todayHoliday = getTodayHoliday(allHolidays, currentDate);
  let upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount, currentDate);

  if (upcomingHolidays.length < upcomingHolidayCount) {
    const nextYearHolidays = await fetchHolidays(currentYear + 1);

    allHolidays = [...allHolidays, ...nextYearHolidays.data];
    upcomingHolidays = getUpcomingHolidays(allHolidays, upcomingHolidayCount, currentDate);
    lastFetch = nextYearHolidays.lastFetch || lastFetch;
  }

  const holidaysToShow = todayHoliday ? upcomingHolidays.slice(0, 3) : upcomingHolidays.slice(1, 4);

  return (
    <div className="flex flex-col justify-center space-y-4">
      <TodayHoliday
        currentDate={currentDate}
        todayHoliday={todayHoliday}
        nextHoliday={upcomingHolidays[0]}
        lastFetch={lastFetch}
      />

      <UpcomingHolidays holidaysToShow={holidaysToShow} year={currentYear} />
    </div>
  );
}
