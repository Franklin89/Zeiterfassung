describe('Test User Integration Service', function() {

    var userIntegrationService;

    var partnerDummy = {
        partnerId: 12345678,
        name1: "Dummy",
        name2: "Partner",
        ort: "Bern",
        geburtsdatum: "1995-01-01",
        partnerArt: {code: 433}
    };

    beforeEach(module('zeiterfassung.ui'));

    beforeEach(inject(function(UsersIntegrationService) {
        userIntegrationService = UsersIntegrationService;
    }));

    it('initialization must work', function() {
        expect(userIntegrationService);
    });
});