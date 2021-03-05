const renderList = require("../public/assets/js/renderlist.js");


test = {}
//Error Hadling
it('it should fall into try catch', function () { expect(renderList.renderShowList(test.JSON)).toBe(true); });
it('it should fall into try catch', function () { expect(renderList.renderTicketList(test.JSON)).toBe(true); });


// Check if they Exist
it('to make sure function exists', function () { expect(renderList.renderShowList); });
it('to make sure function exists', function () { expect(renderList.renderTicketList); });


