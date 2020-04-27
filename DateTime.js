/**
 * @exports { DateTime, DateTimeUTC }
 */

/**
 * translate
 * convertion
 * constructor
 * text
 * input
 */
class DateTimeClass {
    constructor(...date) {
        this.lang = 'en'
        this.language = window.navigator.language
        try {
            if (Array.isArray(date)) {
                if (date.length == 1) {
                    if (date[0] != null) {
                        if (!isNaN(date[0])) {
                            this.dt = new Date(date[0]) // string or int to diferent results (original Date)
                        }
                        else if (typeof date[0] == 'object' && date[0] != null) {
                            if (date[0].constructor.name == 'DateTime') {
                                this.dt = new Date(date[0].dt) // duplicate object
                            }
                            else if (date[0].constructor.name == 'Date') {
                                this.dt = new Date(date[0]) // duplicate object
                            }
                        }
                        else {
                            this.value = date[0]
                        }
                    }
                }
                else if (date.length > 1) {
                    this._inith()
                    for (let i = 0; i < date.length; i++) {
                        if (!isNaN(date[i])) {
                            if (i == 0) {
                                this.y = date[0]
                            }
                            else if (i == 1) {
                                this.m = date[1] + 1
                            }
                            else if (i == 2) {
                                this.d = date[2] + 1
                            }
                            else if (i == 3) {
                                this.h = date[3]
                            }
                            else if (i == 4) {
                                this.i = date[4]
                            }
                            else if (i == 5) {
                                this.s = date[5]
                            }
                            else if (i == 6) {
                                this.u = date[6]
                            }
                        }
                    }
                }
                else {
                    this.dt = new Date()
                }
            }
        }
        catch (e) {
            console.error(e)
            this.dt = null
        }
    }

    now() {
        this.dt = new Date()
        return this
    }

    set value(date) {
        if (typeof date == 'string') { // SQL phpMyAdmin or input
            if (date.search(' ') == 10) {
                const e = date.split(' ')
                this.date = e[0]
                this.time = e[1]
            }
            else if (date.search('T') == 10) {
                const e = date.split('T')
                this.date = e[0]
                this.time = e[1]
            }
            else {
                this.date = date[0]
                this.time = date[1]
            }
        }
    }

    get value() {
        const d = this.D
        const m = this.M
        const y = this.y
        const h = this.H
        const i = this.I
        const s = this.S
        if (d && m && y && h && i && s) {
            return `${y}-${m}-${d} ${h}:${i}:${s}`
        }
        return ''
    }

    get is() {
        if (this.dt) {
            return true
        }
        return false
    }

    get date() {
        const d = this.D
        const m = this.M
        const y = this.y
        if (d && m && y) {
            return `${y}-${m}-${d}`
        }
        return ''
    }

    set date(date) {
        if (typeof date == 'string') { // SQL phpMyAdmin or input
            const d = date.split('-')
            if (d.length == 3) {
                if (d.length == 3) {
                    this._inith()
                    if (!isNaN(d[0]) && !isNaN(d[1]) && !isNaN(d[2])) {
                        this.y = d[0]
                        this.m = d[1]
                        this.d = d[2]
                    }
                }
            }
        }
    }

    get time() {
        const h = this.H
        const i = this.I
        const s = this.S
        const u = this.U
        if (h && i && s && u) {
            return `${h}:${i}:${s}.${u}`
        }
        return ''
    }

    set time(time) {
        if (typeof time == 'string') { // SQL phpMyAdmin or input
            const t = time.split(':')
            this._inith()
            if (t.length == 3) {
                if (!isNaN(t[0]) && !isNaN(t[1]) && !isNaN(t[2])) {
                    this.h = t[0]
                    this.i = t[1]
                    if (t[2].search('.') != -1) {
                        this.s = t[2]
                    }
                    else {
                        this.s = parseInt(t[2])
                        this.u = t[2].split('.')[1]
                    }
                }
            }
            else if (t.length == 2) {
                if (!isNaN(t[0]) && !isNaN(t[1])) {
                    this.h = t[0]
                    this.i = t[1]
                }
            }
        }
    }

    set language(l) {
        if (typeof l == 'string') {
            this.lang = l
        }
    }

    get language() {
        return this.lang
    }

    /**
     * absolute time
     */
    set t(n) {
        if (this.dt && !isNaN(n) && n != null) {
            this.dt.setTime(parseInt(n))
        }
    }

    /**
     * absolute time
     * @return int
     */
    get t() {
        if (this.dt) {
            return this.dt.getTime()
        }
        return NaN
    }

    get gmt() {
        if (this.dt) {
            return this.dt.getTimezoneOffset()
        }
        return NaN
    }

    /**
     * month
     * @return String
     */
    get M() {
        return this._intToStr(this.m)
    }

    /**
     * name
     * @return String
     */
    get month() {
        const m = this.m
        if (m) {
            return DateNames.translate(this.lang).monthName[m]
        }
        return ''
    }

    /**
     * initials
     * @return String
     */
    get mon() {
        const m = this.m
        if (m) {
            return DateNames.translate(this.lang).monthInitials[m]
        }
        return ''
    }

    /**
     * name
     * @return String
     */
    get week() {
        const w = this.w
        if (w) {
            return DateNames.translate(this.lang).weekName[w]
        }
        return ''
    }

    /**
     * initials
     * @return String
     */
    get we() {
        const w = this.w
        if (w) {
            return DateNames.translate(this.lang).weekInitials[w]
        }
        return ''
    }

    /**
     * day
     * @return String
     */
    get D() {
        return this._intToStr(this.d)
    }

    /**
     * hour
     * @return String
     */
    get H() {
        return this._intToStr(this.h)
    }

    /**
     * minute
     * @return String
     */
    get I() {
        return this._intToStr(this.i)
    }

    /**
     * second
     * @return String
     */
    get S() {
        return this._intToStr(this.s)
    }

    /**
     * miliseconds
     * @return String
     */
    get U() {
        let s = this.u
        if (s) {
            if (s.length == 1) {
                s = `00${s}`
            }
            else if (s.length == 2) {
                s = `0${s}`
            }
            return s
        }
        return ''
    }

    get dateFull() {
        if (this.dt) {
            const l = this.lang.toLowerCase()
            if (l.search('pt') != -1 || l.search('es') != -1) {
                return `${this.week}, ${this.d} de ${this.month.toLowerCase()} de ${this.y}`
            }
            else if (l.search('fr') != -1) {
                return `${this.week}, le ${this.d} ${this.month.toLowerCase()} ${this.y}`
            }
            else if (this.lang == 'en-GB') {
                return `${this.week}, ${this.d}th ${this.month} ${this.y}`
            }
            else {
                return `${this.week}, ${this.month} ${this.d}th ${this.y}`
            }
        }
        return undefined
    }

    get dateSmall() {
        if (this.dt) {
            const l = this.lang.toLowerCase()
            if (
                l.search('pt') != -1 ||
                l.search('es') != -1 ||
                l.search('fr') != -1 ||
                this.lang == 'en-GB'
            ) {
                return `${this.D}/${this.M}/${this.y}`
            }
            else {
                return `${this.M}/${this.D}/${this.y}`
            }
        }
        return undefined
    }

    get dateLong() {
        if (this.dt) {
            const l = this.lang.toLowerCase()
            if (l.search('pt') != -1 || l.search('es') != -1) {
                return `${this.d} de ${this.month.toLowerCase()} de ${this.y}`
            }
            else if (l.search('fr') != -1) {
                return `le ${this.d} ${this.month.toLowerCase()} ${this.y}`
            }
            else if (this.lang == 'en-GB') {
                return `${this.d}th ${this.month} ${this.y}`
            }
            else {
                return `${this.month} ${this.d}th ${this.y}`
            }
        }
        return undefined
    }

    get timeFull() {
        if (this.dt) {
            return `${this.h}h${this.i}min${this.s}s`
        }
        return undefined
    }

    get timeBig() {
        if (this.dt) {
            return `${this.h}h${this.i}min`
        }
        return undefined
    }

    get timeLong() {
        if (this.dt) {
            return `${this.H}:${this.I}:${this.S}`
        }
        return undefined
    }

    get timeSmall() {
        if (this.dt) {
            return `${this.H}:${this.I}`
        }
        return undefined
    }

    get DateTimeClassFull() {
        const d = this.dateFull
        const t = this.timeBig
        if (d && t) {
            return `${d} ${t}`
        }
        return undefined
    }

    get DateTimeClassLong() {
        const d = this.dateLong
        const t = this.timeBig
        if (d && t) {
            return `${d} ${t}`
        }
        return undefined
    }

    get DateTimeClassSmall() {
        const d = this.dateSmall
        const t = this.timeSmall
        if (d && t) {
            return `${d} ${t}`
        }
        return undefined
    }

    /**
     * detect input
     * @param {*} input 
     */
    toInput(input) {
        if (this.dt && typeof input == 'object' && input !== null) {
            if (input.type) {
                let v = ''
                if (input.type == 'DateTimeClass-local') {
                    v = this.toInputDateTimeClassLocal()
                }
                else if (input.type == 'date') {
                    v = this.toInputDate()
                }
                if (v) {
                    input.value = v
                    return true
                }
            }
        }
        return false
    }

    toInputDate() {
        return this.date
    }

    toInputDateTimeClassLocal() {
        const d = this.date
        const t = this.time
        if (d && t) {
            return `${d}T${t}`
        }
        return ''
    }

    toText() {
        if (this.dt) {
            return this.dt.toUTCString()
        }
        return ''
    }

    toJSON() {
        if (this.dt) {
            return this.dt.toJSON()
        }
        return null
    }

    toString() {
        if (this.dt) {
            return this.dt.toString()
        }
        return ''
    }

    _inith() {
        if (!this.dt) {
            this.dt = new Date()
            this.y = 0
            this.m = 1
            this.d = 1
            this.h = 0
            this.i = 0
            this.s = 0
            this.u = 0
        }
    }

    _intToStr(n) {
        if (!isNaN(n) && n != null) {
            let s = n.toString()
            if (s.length == 1) {
                s = `0${s}`
            }
            return s
        }
        return ''
    }

    mathIntervalYear(date = null) {
        if (this.dt) {
            let d = new Date()
            if (typeof date == 'object' && date != null) {
                if (date.constructor.name == 'Date') {
                    d = date
                }
                else if (date.constructor.name == 'DateTime') {
                    d = date.dt
                }
            }
            let i = Math.abs(d.getTime() - this.dt.getTime())
            i = Math.ceil(i / 86400000)
            i = Math.floor(i / 365.25)
            return i
        }
        return NaN
    }
}

/**
 * local DateTimeClass
 */
export class DateTime extends DateTimeClass {

    set y(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setFullYear(n)
        }
    }

    /**
     * year
     * yyyy
     * @return int
     */
    get y() {
        if (this.dt) {
            return this.dt.getFullYear()
        }
        return NaN
    }

    /**
     * month
     * @return int
     */
    get m() {
        if (this.dt) {
            return this.dt.getMonth() + 1
        }
        return NaN
    }

    /**
     * ignore 0
     * 1 - 12
     */
    set m(n) {
        if (!isNaN(n) && n != null && this.dt) {
            if (n > 0) {
                this.dt.setMonth(n - 1)
            }
            else if (n < 0) {
                this.dt.setMonth(n)
            }
        }
    }

    /**
     * week
     * 0-6
     * @return int
     */
    get w() {
        if (this.dt) {
            return this.dt.getDay()
        }
        return NaN
    }

    /**
     * day
     * @return int
     */
    get d() {
        if (this.dt) {
            return this.dt.getDate()
        }
        return NaN
    }

    set d(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setDate(n)
        }
    }

    /**
     * hour
     * @return int
     */
    get h() {
        if (this.dt) {
            return this.dt.getHours()
        }
        return NaN
    }

    set h(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setHours(n)
        }
    }

    /**
     * minute
     * @return int
     */
    get i() {
        if (this.dt) {
            return this.dt.getMinutes()
        }
        return NaN
    }

    set i(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setMinutes(n)
        }
    }

    /**
     * second
     * @return int
     */
    get s() {
        if (this.dt) {
            return this.dt.getSeconds()
        }
        return NaN
    }

    set s(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setSeconds(n)
        }
    }

    /**
     * miliseconds
     * @return int
     */
    get u() {
        if (this.dt) {
            return this.dt.getMilliseconds()
        }
        return NaN
    }

    set u(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setMilliseconds(n)
        }
    }
}

/**
 * global DateTimeClass
 */
export class DateTimeUTC extends DateTimeClass {

    set y(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCFullYear(n)
        }
    }

    /**
     * year
     * yyyy
     * @return int
     */
    get y() {
        if (this.dt) {
            return this.dt.getUTCFullYear()
        }
        return NaN
    }

    /**
     * month
     * @return int
     */
    get m() {
        if (this.dt) {
            return this.dt.getUTCMonth() + 1
        }
        return NaN
    }

    /**
     * ignore 0
     * 1 - 12
     */
    set m(n) {
        if (!isNaN(n) && n != null && this.dt) {
            if (n > 0) {
                this.dt.setUTCMonth(n - 1)
            }
            else if (n < 0) {
                this.dt.setUTCMonth(n)
            }
        }
    }

    /**
     * week
     * 0-6
     * @return int
     */
    get w() {
        if (this.dt) {
            return this.dt.getUTCDay()
        }
        return NaN
    }

    /**
     * day
     * @return int
     */
    get d() {
        if (this.dt) {
            return this.dt.getUTCDate()
        }
        return NaN
    }

    set d(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCDate(n)
        }
    }

    /**
     * hour
     * @return int
     */
    get h() {
        if (this.dt) {
            return this.dt.getUTCHours()
        }
        return NaN
    }

    set h(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCHours(n)
        }
    }

    /**
     * minute
     * @return int
     */
    get i() {
        if (this.dt) {
            return this.dt.getUTCMinutes()
        }
        return NaN
    }

    set i(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCMinutes(n)
        }
    }

    /**
     * second
     * @return int
     */
    get s() {
        if (this.dt) {
            return this.dt.getUTCSeconds()
        }
        return NaN
    }

    set s(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCSeconds(n)
        }
    }

    /**
     * miliseconds
     * @return int
     */
    get u() {
        if (this.dt) {
            return this.dt.getUTCMilliseconds()
        }
        return NaN
    }

    set u(n) {
        if (!isNaN(n) && n != null && this.dt) {
            this.dt.setUTCMilliseconds(n)
        }
    }
}

// TRANSLATE DATE ----------
class DateNames {
    static translate(l) {
        l.toLowerCase()
        if (l.search('pt') != -1) {
            return this.pt
        }
        else if (l.search('es') != -1) {
            return this.es
        }
        else if (l.search('fr') != -1) {
            return this.fr
        }
        else {
            return this.en
        }
    }

    static get en() {
        return class DateNameEN {
            static get weekName() {
                return [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ]
            }

            static get weekInitials() {
                return [
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa"
                ]
            }

            static get monthName() {
                return [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ]
            }


            static get monthInitials() {
                return [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "June",
                    "July",
                    "Aug",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dec"
                ]
            }
        }
    }

    static get fr() {
        return class DateNameFR {
            static get weekName() {
                return [
                    "Dimanche",
                    "Lundi",
                    "Mardi",
                    "Mercredi",
                    "Jeudi",
                    "Vendredi",
                    "Samedi"
                ]
            }

            static get weekInitials() {
                return [
                    "Di",
                    "Lu",
                    "Ma",
                    "Me",
                    "Je",
                    "Ve",
                    "Sa"
                ]
            }

            static get monthName() {
                return [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre"
                ]
            }

            static get monthInitials() {
                return [
                    "Janv",
                    "Févr",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juil",
                    "Aout",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Déc"
                ]
            }
        }
    }

    static get es() {
        return class DateNameES {
            static get weekName() {
                return [
                    "Domingo",
                    "Lunes",
                    "Martes",
                    "Miércules",
                    "Jueves",
                    "Viernes",
                    "Sábado"
                ]
            }

            static get weekInitials() {
                return [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ]
            }

            static get monthName() {
                return [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Deciembre"
                ]
            }

            static get monthInitials() {
                return [
                    "Ene",
                    "Feb",
                    "Mar",
                    "Abr",
                    "Mayo",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Sept",
                    "Oct",
                    "Nov",
                    "Dic"
                ]
            }
        }
    }

    static get pt() {
        return class DateNamePT {
            static get weekName() {
                return [
                    "Domingo",
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado"
                ]
            }

            static get weekInitials() {
                return [
                    "Do",
                    "Se",
                    "Te",
                    "Qa",
                    "Qi",
                    "Sx",
                    "Sa"
                ]
            }

            static get monthName() {
                return [
                    "Janeiro",
                    "Fevereiro",
                    "Março",
                    "Abril",
                    "Maio",
                    "Junho",
                    "Julho",
                    "Agosto",
                    "Setembro",
                    "Outubro",
                    "Novembro",
                    "Dezembro"
                ]
            }

            static get monthInitials() {
                return [
                    "Jan",
                    "Fev",
                    "Mar",
                    "Abr",
                    "Maio",
                    "Jun",
                    "Jul",
                    "Ago",
                    "Set",
                    "Out",
                    "Nov",
                    "Dez"
                ]
            }
        }
    }
}
