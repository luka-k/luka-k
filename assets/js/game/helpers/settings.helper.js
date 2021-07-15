/**
 * Game settings
 */
const settings = {
    width: 720,
    height: 1280,
    menu: {
        itemHeight: 90,
        itemWidth: 90
    },
    fonts: {
        label: {
            fontFamily: "Exo",
            fontSize: "28px",
            fill: "#f2dec5" //#edfffd 
        },
        menu:{
            fontFamily: "Exo",
            fontSize: "28px",
            fill: "#f2dec5"
        },
    },
    cursors: {
        defaultCursor: "assets/img/ui/cursors/blue.cur",
        pointerCursor: "assets/img/ui/cursors/pen.cur",
    },
    init: function () {
        this.setHeight();
    },
    setHeight: function () {
        if (screen.height <= screen.width) return;

        this.height = this.width * screen.height / screen.width;
    }

};

const groundMock = {
    0: {
        Type: 1,
        Direction: 1,
        Chords: {
            0: [9, 9]
        }
    },
    1: {
        Type: 1,
        Direction: 0,
        Chords: {
            0: [7, 9]
        }
    },
    2: {
        Type: 1,
        Direction: 1,
        Chords: {
            0: [9, 7]
        }
    },
    3: {
        Type: 1,
        Direction: 0,
        Chords: {
            0: [7, 7]
        }
    },
    4: {
        Type: 2,
        Direction: 0,
        Chords: {
            0: [2, 0],
            1: [3, 0]
        }
    },
    5: {
        Type: 2,
        Direction: 1,
        Chords: {
            0: [5, 0],
            1: [5, 1]
        }
    },
    6: {
        Type: 2,
        Direction: 0,
        Chords: {
            0: [2, 2],
            1: [3, 2]
        }
    },
    7: {
        Type: 3,
        Direction: 0,
        Chords: {
            0: [7, 0],
            1: [8, 0],
            2: [9, 0]
        }
    },
    8: {
        Type: 3,
        Direction: 1,
        Chords: {
            0: [9, 2],
            1: [9, 3],
            2: [9, 4]
        }
    },
    9: {
        Type: 4,
        Direction: 1,
        Chords: {
            0: [0, 0],
            1: [0, 1],
            2: [0, 2],
            3: [0, 3]
        }
    }
};