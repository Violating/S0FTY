function exists(e) {
    return e ? !0 : 0 == e || 0 == e || "" == e
}

function isString(e) {
    return "string" == typeof e
}

function isFunction(e) {
    return "function" == typeof e
}

function isArray(e) {
    return e instanceof Array
}

function isDefined(e) {
    return "undefined" != typeof e
}

function valOrEmpty(e) {
    return e ? e : ""
}

function valOrDefault(e, t) {
    return exists(e) ? e : t
}

function getQSValue(e, t) {
    var n = "&" + t.toLowerCase() + "=",
        r = e.toLowerCase().indexOf(n);
    if (-1 == r && (n = "?" + t.toLowerCase() + "=", r = e.toLowerCase().indexOf(n), -1 == r)) {
        return null
    }
    var o = e.indexOf("&", r + 1);
    return -1 == o && (o = e.length), e.substring(r + n.length, o)
}

function strEquals(e, t, n) {
    return isString(e) && isString(t) ? n ? e.toLowerCase() == t.toLowerCase() : e === t : !1
}

function arrExists(e, t) {
    if (!exists(e)) {
        return !1
    }
    for (var n = isArray(t) ? t : arguments, r = isArray(t) ? 0 : 1, o = r; o < n.length; o++) {
        if (!exists(n[o]) || !exists(e[n[o]])) {
            return !1
        }
        e = e[n[o]]
    }
    return !0
}

function Derive(e, t) {
    function n() {}
    var r = t.prototype;
    n.prototype = e.prototype, t.prototype = new n;
    for (var o in r) {
        t.prototype[o] = r[o]
    }
}

function FormatString(e) {
    for (var t = 1; t < arguments.length; t++) {
        e = e.replace(new RegExp("\\{" + (t - 1) + "\\}", "g"), arguments[t])
    }
    return e
}

function DoTestDelay(e) {
    return e(), null
} 

function PackageSAData(e, t) {
    var n = [],
        r = 0;
    n[r++] = 1, n[r++] = 1, n[r++] = 0;
    var o, a = t.length;
    for (n[r++] = 2 * a, o = 0; a > o; o++) {
        n[r++] = 255 & t.charCodeAt(o), n[r++] = (65280 & t.charCodeAt(o)) >> 8
    }
    var i = e.length;
    for (n[r++] = i, o = 0; i > o; o++) {
        n[r++] = 127 & e.charCodeAt(o)
    }
    return n
}

function PackagePwdOnly(e) {
    var t = [],
        n = 0;
    t[n++] = 1, t[n++] = 1, t[n++] = 0, t[n++] = 0;
    var r, o = e.length;
    for (t[n++] = o, r = 0; o > r; r++) {
        t[n++] = 127 & e.charCodeAt(r)
    }
    return t
}

function PackagePinOnly(e) {
    var t = [],
        n = 0;
    t[n++] = 1, t[n++] = 2, t[n++] = 0, t[n++] = 0, t[n++] = 0;
    var r, o = e.length;
    for (t[n++] = o, r = 0; o > r; r++) {
        t[n++] = 127 & e.charCodeAt(r)
    }
    return t
}

function PackageLoginIntData(e) {
    var t, n = [],
        r = 0;
    for (t = 0; t < e.length; t++) {
        n[r++] = 255 & e.charCodeAt(t), n[r++] = (65280 & e.charCodeAt(t)) >> 8
    }
    return n
}

function PackageSADataForProof(e) {
    var t, n = [],
        r = 0;
    for (t = 0; t < e.length; t++) {
        n[r++] = 127 & e.charCodeAt(t), n[r++] = (65280 & e.charCodeAt(t)) >> 8
    }
    return n
}

function PackageNewPwdOnly(e) {
    var t = [],
        n = 0;
    t[n++] = 1, t[n++] = 1;
    var r, o = e.length;
    for (t[n++] = o, r = 0; o > r; r++) {
        t[n++] = 127 & e.charCodeAt(r)
    }
    return t[n++] = 0, t[n++] = 0, t
}

function PackageNewAndOldPwd(e, t) {
    var n = [],
        r = 0;
    n[r++] = 1, n[r++] = 1;
    var o, a = t.length;
    for (n[r++] = a, o = 0; a > o; o++) {
        n[r++] = 127 & t.charCodeAt(o)
    }
    for (n[r++] = 0, a = e.length, n[r++] = a, o = 0; a > o; o++) {
        n[r++] = 127 & e.charCodeAt(o)
    }
    return n
}

function mapByteToBase64(e) {
    return e >= 0 && 26 > e ? String.fromCharCode(65 + e) : e >= 26 && 52 > e ? String.fromCharCode(97 + e - 26) : e >= 52 && 62 > e ? String.fromCharCode(48 + e - 52) : 62 == e ? "+" : "/"
}

function base64Encode(e, t) {
    var n, r = "";
    for (n = t; 4 > n; n++) {
        e >>= 6
    }
    for (n = 0; t > n; n++) {
        r = mapByteToBase64(63 & e) + r, e >>= 6
    }
    return r
}

function byteArrayToBase64(e) {
    var t, n, r = e.length,
        o = "";
    for (t = r - 3; t >= 0; t -= 3) {
        n = e[t] | e[t + 1] << 8 | e[t + 2] << 16, o += base64Encode(n, 4)
    }
    var a = r % 3;
    for (n = 0, t += 2; t >= 0; t--) {
        n = n << 8 | e[t]
    }
    return 1 == a ? o = o + base64Encode(n << 16, 2) + "==" : 2 == a && (o = o + base64Encode(n << 8, 3) + "="), o
}

function parseRSAKeyFromString(e) {
    var t = e.indexOf(";");
    if (0 > t) {
        return null
    }
    var n = e.substr(0, t),
        r = e.substr(t + 1),
        o = n.indexOf("=");
    if (0 > o) {
        return null
    }
    var a = n.substr(o + 1);
    if (o = r.indexOf("="), 0 > o) {
        return null
    }
    var i = r.substr(o + 1),
        s = new Object;
    return s.n = hexStringToMP(i), s.e = parseInt(a, 16), s
}

function RSAEncrypt(e, t, randomNum) {
    for (var n = [], r = 42, o = 2 * t.n.size - r, a = 0; a < e.length; a += o) {
        if (a + o >= e.length) {
            var i = RSAEncryptBlock(e.slice(a), t, randomNum);
            i && (n = i.concat(n))
        } else {
            var i = RSAEncryptBlock(e.slice(a, a + o), t, randomNum);
            i && (n = i.concat(n))
        }
    }
    var s = byteArrayToBase64(n);
    return s
}

function RSAEncryptBlock(e, t, n) {
    var r = t.n,
        o = t.e,
        a = e.length,
        i = 2 * r.size,
        s = 42;
    if (a + s > i) {
        return null
    }
    applyPKCSv2Padding(e, i, n), e = e.reverse();
    var l = byteArrayToMP(e),
        c = modularExp(l, o, r);
    c.size = r.size;
    var u = mpToByteArray(c);
    return u = u.reverse()
}

function JSMPnumber() {
    this.size = 1, this.data = [], this.data[0] = 0
}

function duplicateMP(e) {
    var t = new JSMPnumber;
    return t.size = e.size, t.data = e.data.slice(0), t
}

function byteArrayToMP(e) {
    var t = new JSMPnumber,
        n = 0,
        r = e.length,
        o = r >> 1;
    for (n = 0; o > n; n++) {
        t.data[n] = e[2 * n] + (e[1 + 2 * n] << 8)
    }
    return r % 2 && (t.data[n++] = e[r - 1]), t.size = n, t
}

function mpToByteArray(e) {
    var t = [],
        n = 0,
        r = e.size;
    for (n = 0; r > n; n++) {
        t[2 * n] = 255 & e.data[n];
        var o = e.data[n] >>> 8;
        t[2 * n + 1] = o
    }
    return t
}

function modularExp(e, t, n) {
    for (var r = [], o = 0; t > 0;) {
        r[o] = 1 & t, t >>>= 1, o++
    }
    for (var a = duplicateMP(e), i = o - 2; i >= 0; i--) {
        a = modularMultiply(a, a, n), 1 == r[i] && (a = modularMultiply(a, e, n))
    }
    return a
}

function modularMultiply(e, t, n) {
    var r = multiplyMP(e, t),
        o = divideMP(r, n);
    return o.r
}

function multiplyMP(e, t) {
    var n = new JSMPnumber;
    n.size = e.size + t.size;
    var r, o;
    for (r = 0; r < n.size; r++) {
        n.data[r] = 0
    }
    var a = e.data,
        i = t.data,
        s = n.data;
    if (e == t) {
        for (r = 0; r < e.size; r++) {
            s[2 * r] += a[r] * a[r]
        }
        for (r = 1; r < e.size; r++) {
            for (o = 0; r > o; o++) {
                s[r + o] += 2 * a[r] * a[o]
            }
        }
    } else {
        for (r = 0; r < e.size; r++) {
            for (o = 0; o < t.size; o++) {
                s[r + o] += a[r] * i[o]
            }
        }
    }
    return normalizeJSMP(n), n
}

function normalizeJSMP(e) {
    var t, n, r, o, a;
    for (r = e.size, n = 0, t = 0; r > t; t++) {
        o = e.data[t], o += n, a = o, n = Math.floor(o / 65536), o -= 65536 * n, e.data[t] = o
    }
}

function removeLeadingZeroes(e) {
    for (var t = e.size - 1; t > 0 && 0 == e.data[t--];) {
        e.size--
    }
}

function divideMP(e, t) {
    var n = e.size,
        r = t.size,
        o = t.data[r - 1],
        a = t.data[r - 1] + t.data[r - 2] / 65536,
        i = new JSMPnumber;
    i.size = n - r + 1, e.data[n] = 0;
    for (var s = n - 1; s >= r - 1; s--) {
        var l = s - r + 1,
            c = Math.floor((65536 * e.data[s + 1] + e.data[s]) / a);
        if (c > 0) {
            var u = multiplyAndSubtract(e, c, t, l);
            for (0 > u && (c--, multiplyAndSubtract(e, c, t, l)); u > 0 && e.data[s] >= o;) {
                u = multiplyAndSubtract(e, 1, t, l), u > 0 && c++
            }
        }
        i.data[l] = c
    }
    removeLeadingZeroes(e);
    var d = {
        "q": i,
        "r": e
    };
    return d
}

function multiplyAndSubtract(e, t, n, r) {
    var o, a = e.data.slice(0),
        i = 0,
        s = e.data;
    for (o = 0; o < n.size; o++) {
        var l = i + n.data[o] * t;
        i = l >>> 16, l -= 65536 * i, l > s[o + r] ? (s[o + r] += 65536 - l, i++) : s[o + r] -= l
    }
    return i > 0 && (s[o + r] -= i), s[o + r] < 0 ? (e.data = a.slice(0), -1) : 1
}

function applyPKCSv2Padding(e, t, n) {
    var r, o = e.length,
        a = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9],
        i = t - o - 40 - 2,
        s = [];
    for (r = 0; i > r; r++) {
        s[r] = 0
    }
    s[i] = 1;
    var l = a.concat(s, e),
        c = [];
    for (r = 0; 20 > r; r++) {
        c[r] = Math.floor(256 * Math.random())
    }
    c = SHA1(c.concat(n));
    var u = MGF(c, t - 21),
        d = XORarrays(l, u),
        p = MGF(d, 20),
        f = XORarrays(c, p),
        v = [];
    for (v[0] = 0, v = v.concat(f, d), r = 0; r < v.length; r++) {
        e[r] = v[r]
    }
}

function MGF(e, t) {
    if (t > 4096) {
        return null
    }
    var n = e.slice(0),
        r = n.length;
    n[r++] = 0, n[r++] = 0, n[r++] = 0, n[r] = 0;
    for (var o = 0, a = []; a.length < t;) {
        n[r] = o++, a = a.concat(SHA1(n))
    }
    return a.slice(0, t)
}

function XORarrays(e, t) {
    if (e.length != t.length) {
        return null
    }
    for (var n = [], r = e.length, o = 0; r > o; o++) {
        n[o] = e[o] ^ t[o]
    }
    return n
}

function SHA1(e) {
    var t, n = e.slice(0);
    PadSHA1Input(n);
    var r = {
        "A": 1732584193,
        "B": 4023233417,
        "C": 2562383102,
        "D": 271733878,
        "E": 3285377520
    };
    for (t = 0; t < n.length; t += 64) {
        SHA1RoundFunction(r, n, t)
    }
    var o = [];
    return wordToBytes(r.A, o, 0), wordToBytes(r.B, o, 4), wordToBytes(r.C, o, 8), wordToBytes(r.D, o, 12), wordToBytes(r.E, o, 16), o
}

function wordToBytes(e, t, n) {
    var r;
    for (r = 3; r >= 0; r--) {
        t[n + r] = 255 & e, e >>>= 8
    }
}

function PadSHA1Input(e) {
    var t, n = e.length,
        r = n,
        o = n % 64,
        a = 55 > o ? 56 : 120;
    for (e[r++] = 128, t = o + 1; a > t; t++) {
        e[r++] = 0
    }
    var i = 8 * n;
    for (t = 1; 8 > t; t++) {
        e[r + 8 - t] = 255 & i, i >>>= 8
    }
}

function SHA1RoundFunction(e, t, n) {
    var r, o, a, i = 1518500249,
        s = 1859775393,
        l = 2400959708,
        c = 3395469782,
        u = [],
        d = e.A,
        p = e.B,
        f = e.C,
        v = e.D,
        g = e.E;
    for (o = 0, a = n; 16 > o; o++, a += 4) {
        u[o] = t[a] << 24 | t[a + 1] << 16 | t[a + 2] << 8 | t[a + 3] << 0
    }
    for (o = 16; 80 > o; o++) {
        u[o] = rotateLeft(u[o - 3] ^ u[o - 8] ^ u[o - 14] ^ u[o - 16], 1)
    }
    var m;
    for (r = 0; 20 > r; r++) {
        m = rotateLeft(d, 5) + (p & f | ~p & v) + g + u[r] + i & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
    }
    for (r = 20; 40 > r; r++) {
        m = rotateLeft(d, 5) + (p ^ f ^ v) + g + u[r] + s & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
    }
    for (r = 40; 60 > r; r++) {
        m = rotateLeft(d, 5) + (p & f | p & v | f & v) + g + u[r] + l & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
    }
    for (r = 60; 80 > r; r++) {
        m = rotateLeft(d, 5) + (p ^ f ^ v) + g + u[r] + c & 4294967295, g = v, v = f, f = rotateLeft(p, 30), p = d, d = m
    }
    e.A = e.A + d & 4294967295, e.B = e.B + p & 4294967295, e.C = e.C + f & 4294967295, e.D = e.D + v & 4294967295, e.E = e.E + g & 4294967295
}

function rotateLeft(e, t) {
    var n = e >>> 32 - t,
        r = (1 << 32 - t) - 1,
        o = e & r;
    return o << t | n
}

function hexStringToMP(e) {
    var t, n, r = Math.ceil(e.length / 4),
        o = new JSMPnumber;
    for (o.size = r, t = 0; r > t; t++) {
        n = e.substr(4 * t, 4), o.data[r - 1 - t] = parseInt(n, 16)
    }
    return o
} 

function returnEncryptedGuess(answer, key, randomNum) {
    var guessOne = PackageLoginIntData(answer);
    var guessTwo = PackageSADataForProof(answer);
    var keyParsed = parseRSAKeyFromString(key);
    var part1 = RSAEncrypt(guessOne, keyParsed, randomNum);
    var part2 = RSAEncrypt(guessTwo, keyParsed, randomNum);
    return String(part1)+":::"+String(part2)
}; 

function returnEncryptedPassword(newpass1, key, randomNum) {
    var newpass2 = PackageNewPwdOnly(newpass1);
    var keyParsed = parseRSAKeyFromString(key);
    var part1 = RSAEncrypt(newpass2, keyParsed, randomNum);
    return String(part1)
}; 