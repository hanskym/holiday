import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { HolidayEntry } from '@/types/holiday';

import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/Card';

import { groupHolidaysByMonth } from '@/lib/parser';

interface HolidayCalendarProps {
  holidays: HolidayEntry[];
  year: number;
}

export default function HolidayCalendar({
  holidays,
  year = new Date().getFullYear(),
}: HolidayCalendarProps) {
  const holidaysByMonth = groupHolidaysByMonth(holidays, year);

  return (
    <div className="w-full">
      <div className="relative z-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {holidaysByMonth.map((data, index) => (
          <div key={`${year}-${index}`} className="group col-span-1">
            <Card>
              <CardContent className="flex-grow space-y-8 rounded-t-lg bg-[#fef4e2] p-6">
                <CardTitle className="flex flex-nowrap items-center justify-between gap-4 font-bold">
                  <span className="font-mono text-4xl font-semibold text-gray-800">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </CardTitle>
                <CardDescription>
                  {data.holidays.length > 0 ? (
                    data.holidays.map((holiday) => (
                      <div
                        key={`${holiday.holidayDate.toString()}-${holiday.holidayName}`}
                        className="flex flex-col gap-1"
                      >
                        <div className="flex items-center">
                          <span className="text-sm text-gray-600">
                            {format(new Date(holiday.holidayDate), 'EEEE, dd MMMM yyyy', {
                              locale: id,
                            })}
                          </span>
                          {holiday.isLeave && (
                            <span className="ml-1 inline-flex items-center rounded-full bg-green-300 p-0.5 text-xs font-medium text-green-700">
                              Cuti Bersama
                            </span>
                          )}
                        </div>
                        <span className="font-medium">{holiday.holidayName}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600">No holidays</div>
                  )}
                </CardDescription>
              </CardContent>
              <CardFooter className="items-center justify-between gap-2">
                <p>{data.month}</p>
                <p>{year}</p>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
