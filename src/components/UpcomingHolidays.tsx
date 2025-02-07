import Link from 'next/link';

import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { UpcomingHoliday } from '@/types/holiday';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/Card';

interface UpcomingHolidaysProps {
  holidaysToShow: UpcomingHoliday[];
  year: number;
}

export default function UpcomingHolidays({
  holidaysToShow,
  year = new Date().getFullYear(),
}: UpcomingHolidaysProps) {
  return (
    <div className="relative rounded-xl border border-gray-200 bg-neutral-100 p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-medium text-gray-800">Libur Nasional Berikutnya</h2>
        <Link href={`/year/${year}`}>
          <Button>Selengkapnya</Button>
        </Link>
      </div>

      <div className="relative z-10 mt-4 grid grid-cols-6 gap-3">
        {holidaysToShow.length === 0 ? (
          <Card className="group col-span-full">
            <CardContent className="flex-grow space-y-8 rounded-t-lg bg-[#fef4e2] p-6">
              <CardTitle className="flex flex-nowrap items-center justify-between gap-4 font-bold">
                Data Tidak Tersedia
              </CardTitle>
              <CardDescription>
                Informasi mengenai hari libur selanjutnya belum tersedia.
              </CardDescription>
            </CardContent>
          </Card>
        ) : (
          holidaysToShow.map((holiday, index) => (
            <Card
              key={holiday.holidayDate.toString()}
              className="group col-span-full md:col-span-2"
            >
              <CardContent className="flex-grow space-y-8 rounded-t-lg bg-[#fef4e2] p-6">
                <CardTitle className="flex flex-nowrap items-center justify-between gap-4 font-bold">
                  <span className="font-mono text-4xl font-semibold text-gray-800">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  {holiday.isLeave && (
                    <span className="inline-flex items-center rounded-full bg-green-300 p-0.5 text-xs font-medium text-green-700">
                      Cuti Bersama
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  <h3 className="text-3xl font-semibold">{holiday.holidayName}</h3>
                </CardDescription>
              </CardContent>
              <CardFooter className="items-center justify-between gap-2">
                <p className="flex items-center gap-3">
                  {format(new Date(holiday.holidayDate), 'EEEE, dd MMMM yyyy', { locale: id })}
                </p>
                <p>{holiday.daysUntil} hari lagi</p>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
