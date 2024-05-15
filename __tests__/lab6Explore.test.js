describe('Basic user flow for Note Website', () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5500/index.html');
    });

    //Check to make sure that intial home page has 0 notes
    it('Test1: Initial Home page - check intial home page for notes', async () => {
        const numNotes = await page.$$eval('note', (numNotes) => {
            return numNotes.length;
        });
        expect(numNotes).toBe(0);
    }, 10000);

    //Check to make sure that adding a note actually adds a note
    it('Test2: Add a note, and check notes length', async () => {
        await page.click('.add-note');
        await page.click('.add-note');
        const notes = await page.$$('textarea.note');
        expect(notes.length).toBe(2);

    }, 10000);

    //Check that refreshing keeps the note
    it('Test3: Refresh page, check if note length remains the same', async () => {
        await page.click('.add-note');
        await page.reload();
        const notes = await page.$$('textarea.note');
        expect(notes.length).toBe(3);
    }, 10000);
    
    //Check that writing to a new note and saving will save it
    it('Test4: ', async () => {
        const notes = await page.$$('textarea.note');
        const note = notes[1];
        await note.click();
        await note.type('Test4 content');
        const txt = await (await note.getProperty('value')).jsonValue();
        await page.click('body');
        expect(txt).toBe('Test4 content');
    }, 10000);

    //Check that refreshing keeps the new text
    it('Test5: Refresh page, check if new text is saved', async () => {
        await page.reload()
        const notes = await page.$$('textarea.note');
        const note = notes[1];
        const txt = await (await note.getProperty('value')).jsonValue();
        expect(txt).toBe('Test4 content');
    }, 10000);
    
    //Check that editing an old note can be saved
    it('Test6: edit an old note and check if it saves', async () => {
        const notes = await page.$$('textarea.note');
        const note = notes[1];
        await note.click();
        for(let i=0; i<7; i++){
            await page.keyboard.press('Backspace');
        }
        await note.type('EDITED');
        const txt = await (await note.getProperty('value')).jsonValue();
        await page.click('body');
        expect(txt).toBe('Test4 EDITED');

    }, 10000);

    //Check that refreshing will keep the saved edited note
    it('Test7: refresh the page and make sure that the edited note remains', async () => {
        await page.reload()
        const notes = await page.$$('textarea.note');
        const note = notes[1];
        const txt = await (await note.getProperty('value')).jsonValue();
        expect(txt).toBe('Test4 EDITED');
    }, 10000);
    
    //Check that deleting a note works
    it('Test7: delte a note', async () => {
        let notes = await page.$$('textarea.note');
        const note = notes[1];
        await note.click({ clickCount: 2 });

        notes = await page.$$('textarea.note');
        expect(notes.length).toBe(2);
    }, 10000);

    //Check that refreshing the page updates correctly
    it('Test8: refresh page and make sure everything is the same', async () => {
        await page.reload()
        const notes = await page.$$('textarea.note');
        expect(notes.length).toBe(2);

    }, 10000);
    
});