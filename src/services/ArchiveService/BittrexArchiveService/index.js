import { get } from 'axios';

import db from 'services/db';

class BittrexArchiveService {
    static async run() {
        const i = setInterval(async () => {
            const { data } = await get('https://bittrex.com/api/v1.1/public/getmarketsummaries');

            const record = data.result.reduce((output, item) => {
                if (item.MarketName.match(/^BTC-(DASH|ETH|LTC)$/)) {
                    output[item.MarketName] = item.Last;
                }

                return output;
            }, {});

            // eslint-disable-next-line no-console
            console.log('BITTREX ARCHIVE', JSON.stringify(record));

            record.timestamp = Date.now();

            db.bittrex.push(record);
        }, 1000);

        setTimeout(() => {
            clearInterval(i);
        }, 5500);
    }
}

export default BittrexArchiveService;
