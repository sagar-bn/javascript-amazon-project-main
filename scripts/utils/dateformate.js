import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let dateString;
export function dateformat(date){
dateString= dayjs(date).format(
                    'MMMM D'
                  );
                  return dateString;
}



