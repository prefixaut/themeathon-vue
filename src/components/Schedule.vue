<template>
    <div style="display: none;" v-if="!scheduleId"></div>
    <table class="schedule" v-else-if="!loading">
        <thead>
            <tr>
                <th class="scheduled">Scheduled</th>
                <th class="time">Estimate</th>
                <th v-for="(name, index) in columns" :key="index" :class="'data data-' + index">{{ name }}</th>
                <th class="last"></th>
            </tr>
        </thead>
        <tbody v-for="(rows, day, dayIndex) in days" :key="dayIndex">
            <tr class="day-seperator">
                <td :colspan="columns.length + 2">{{ rows[0].scheduled | dateString }}</td>
            </tr>
            <template v-for="(row, rowIndex) in rows">
                <tr class="run-row" :key="'row-' + dayIndex + '-' + rowIndex">
                    <td class="scheduled">{{ row.scheduled | dateTime }}</td>
                    <td class="time">{{ row.length_t | time }}</td>
                    <td
                        v-for="(data, dataIndex) in row.data"
                        :key="dataIndex"
                        v-html="data"
                        :class="'data data-' + dataIndex"
                    ></td>
                    <td class="last">
                        <button class="expand-button" role="button" @click="toggleRow(rowIndex)">expand</button>
                    </td>

                </tr>
                <tr class="mobile-row" :key="'mobile-row-' + dayIndex + '-' + rowIndex" :class="{ expanded: isExpanded(rowIndex) }">
                    <td :colspan="columns.length + 2">
                        <p>
                            <span class="title">Estimate</span>
                            <span class="value">{{ row.length_t | time }}</span>
                        </p>
                        <p
                            v-for="(data, dataIndex) in row.data"
                            :key="dataIndex"
                            v-if="dataIndex > 0"
                        >
                            <span class="title">{{ columns[dataIndex] }}</span>
                            <span class="value" v-html="data"></span>
                        </p>
                    </td>
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
        if (!this.scheduleId) {
            return;
        }

        jsonp('https://horaro.org/-/api/v1/schedules/' + this.scheduleId, null, (err, res) => {
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
            scheduleId: process.env.SCHEDULE_ID,
            loading: true,
            errored: false,
            columns: [],
            days: {},
            expandedRows: [],
        };
    },
    methods: {
        handleResponse(res) {
            this.columns = res.data.columns;
            const items = res.data.items.slice(0).map(this.normalizeRow);
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
        },
        isExpanded(index) {
            return this.expandedRows.indexOf(index) !== -1;
        },
        toggleRow(rowIndex) {
            const index = this.expandedRows.indexOf(rowIndex);
            if (index === -1) {
                this.expandedRows.push(rowIndex);
            } else {
                this.expandedRows.splice(index, 1);
            }
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

table.schedule {
    width: 100%;
    background: $color-off-white;
    box-shadow: 0 5px 5px #{'rgba(0, 0, 0, 20%)'}, -5px 0 5px #{'rgba(0, 0, 0, 20%)'}, 5px 0 5px #{'rgba(0, 0, 0, 20%)'};
    border-collapse: collapse;
    font-family: 'ADAM', sans-serif;

    td {
        box-sizing: border-box;
        font-size: 1rem;
        padding: 15px 20px;
        word-break: break-all;
    }

    th {
        box-sizing: border-box;
        text-align: center;
        font-size: 1.25rem;
        padding: 10px 15px;
    }

    td.time {
        text-align: right;
    }

    .day-seperator {
        background: $color-primary-very-light;
        text-align: center;
    }

    .last,
    .hidden,
    .mobile-row {
        display: none;
    }

    .expand-button {
        padding: 5px 10px 9px;
        background: $color-off-white;
        border: 1px solid $color-primary-very-dark;
        font-family: 'ADAM', sans-serif;
        transition: 300ms;
        cursor: pointer;
        word-break: initial;

        &:hover {
            background: darken($color-off-white, 5%);
        }
    }

    .mobile-row {
        .title {
            color: $color-primary-very-dark;

            &::after {
                display: inline-block;
                content: ':';
                color: #000;
            }
        }

        .value {
            display: block;
            margin-left: 15px;
            margin-top: 10px;

            p {
                margin: 0;
            }
        }
    }

    @include media-down('md') {
        td {
            font-size: 0.9rem;
            padding: 10px;
        }

        th {
            font-size: 1.05rem;
            padding: 10px;
        }
    }

    @include media-down('sm') {
        .last,
        .last {
            display: table-cell;
        }

        .time,
        .data {
            display: none;
        }

        .data-0 {
            display: table-cell;
        }

        tr.mobile-row.expanded {
            display: table-row;
        }
    }

    tr.run-row,
    tr.mobile-row {
        &:hover {
            background: darken($color-off-white, 3%);
        }
    }

    tr.run-row:nth-child(4n) {
        &,
        & + .mobile-row {
            background: darken($color-off-white, 5%);

            &:hover {
                background: darken($color-off-white, 8%);
            }
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
