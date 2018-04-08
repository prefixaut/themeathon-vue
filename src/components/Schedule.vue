<template>
    <table v-if="!loading">
        <thead>
            <tr>
                <th v-for="(name, index) in columnNames" :key="index">{{ name }}</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(rows, day, dayIndex) in days">
                <tr class="day-seperator" :key="'seperator-' + dayIndex">
                    <td :colspan="columnNames.length">{{ rows[0].scheduled | dateString }}</td>
                </tr>
                <tr v-for="(row, rowIndex) in rows" :key="'row-' + dayIndex + '-' + rowIndex">
                    <td>{{ row.scheduled | dateTime }}</td>
                    <td class="right">{{ row.length_t | time }}</td>
                    <td v-for="(data, dataIndex) in row.data" :key="dataIndex" v-html="data"></td>
                </tr>
            </template>
        </tbody>
    </table>

    <div v-else-if="errored" class="text-container">
        <p>There has been an error while loading the Schedule. Please try again later</p>
    </div>

    <tt-spinner v-else></tt-spinner>
</template>

<script>
import jsonp from 'jsonp';
import { Aevum } from 'aevum';
import { markdown } from 'markdown';

const timeFormatter = new Aevum('(h)[[h]:](mm)[[mm]:][ss]');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default {
    created() {
        jsonp('https://horaro.org/-/api/v1/schedules/71111yc1eadakv7a29', null, (err, res) => {
            if (err) {
                this.errored = true;
                this.loading = false;
                console.error(err);
                return;
            }
            this.handleResponse(res);
        });
    },
    data() {
        return {
            loading: true,
            errored: false,
            columnNames: [],
            days: {},
        };
    },
    methods: {
        handleResponse(res) {
            this.columnNames = ['Scheduled', 'Estimate', ...res.data.columns];
            const items = res.data.items.map(this.normalizeRow);
            this.days = this.groupByDates(items);
            this.loading = false;
        },
        normalizeRow(row) {
            row.data = row.data.map(this.normalizeData);
            return row;
        },
        normalizeData(data) {
            return markdown.toHTML(data);
        },
        groupByDates(rows) {
            const dates = {};
            rows.forEach(row => {
                const date = new Date(row.scheduled).toLocaleDateString();
                const items = dates[date] || [];
                items.push(row);
                dates[date] = items;
            });
            return dates;
        }
    },
    filters: {
        dateString(value) {
            const date = new Date(value);
            const year = date.getFullYear();
            let dateStr = date.getDate();

            if (dateStr < 11 && dateStr < 20) {
                dateStr += 'th';
            } else {
                const last = date.substr(-1);
                switch (last) {
                    case '1':
                        dateStr += 'st';
                        break;
                    case '2':
                        dateStr += 'nd';
                        break;
                    case '3':
                        dateStr += 'rd';
                        break;
                    default:
                        dateStr += 'th';
                        break;
                }
            }

            let str = days[date.getDay()] + ', ' + dateStr + ' ' + months[date.getMonth()];
            if (year !== new Date().getFullYear()) {
                str += ' ' + year;
            }
            return str;
        },
        dateTime(value) {
            const date = new Date(value);
            let hours = date.getHours();
            if (hours < 10) {
                hours = '0' + hours;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            return hours + ':' + minutes;
        },
        time(value) {
            return timeFormatter.format(value * 1000);
        }
    }
};
</script>

<style lang="scss">
@import '../styles/config';

table {
    width: 100%;
    background: $color-off-white;
    box-shadow: 0 5px 5px #{'rgba(0, 0, 0, 20%)'}, -5px 0 5px #{'rgba(0, 0, 0, 20%)'}, 5px 0 5px #{'rgba(0, 0, 0, 20%)'};
    border-collapse: collapse;

    td {
        font-family: 'ADAM', sans-serif;
        box-sizing: border-box;
        font-size: 1rem;
        padding: 15px 20px;
    }
    th {
        font-family: 'ADAM', sans-serif;
        box-sizing: border-box;
        text-align: center;
        font-size: 1.25rem;
        padding: 10px 15px;
    }
    .right {
        text-align: right;
    }
    tr.day-seperator {
        background: $color-primary-very-light;

        td {
            text-align: center;
        }
    }
    thead {
        background: $color-primary-base;
    }

    a {
        text-decoration: none;
        color: $color-primary-very-dark;
    }
}
</style>
