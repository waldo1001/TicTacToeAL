// This file contains the actual JavaScript logic

var demo = (function () {
    var host, table;
    var grid = {};
    var turn = 'x';

    function click(x, y) {
        var field = grid[y].cols[x];
        field.clicked = turn;
        field.$
            .append("<img src='" + Microsoft.Dynamics.NAV.GetImageResource("images/" + turn + ".png") + "'>")
            .addClass("filled");
        turn === "x" && Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("PlayerHasMoved", [{ x: x, y: y }]);
        turn = turn === 'x' ? 'o' : 'x';
    };

    var demo = {
        init: function (id) {
            host = $("#" + id);
            table = $("<table>");
            host.append(table);

            for (var row = 0; row < 3; row++) {
                grid[row] = {
                    $: $("<tr>"),
                    index: row,
                    cols: {}
                };
                table.append(grid[row].$);
                for (var col = 0; col < 3; col++) {
                    function getClickFunc(x, y) {
                        return function () {
                            if (turn !== "x")
                                return;

                            if (grid[y].cols[x].clicked)
                                return;

                            click(x, y);
                        };
                    };
                    grid[row].cols[col] = {
                        $: $("<td>").click(getClickFunc(col, row)),
                        index: col
                    };
                    grid[row].$.append(grid[row].cols[col].$);
                };
            };
        }
    };

    window.SetName = function (name) {
        alert("Hi, " + name + "! Ready to play some TicTacToe? It's your turn.");
    };

    window.MoveAI = function (position) {
        click(position.x, position.y);
    };

    return demo;
})();