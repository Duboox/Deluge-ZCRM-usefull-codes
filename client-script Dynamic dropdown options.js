var list_options = [];
list_options.push({ actual_value: "Assis: ", display_value: "Assis: " });
list_options.push({ actual_value: "Debout: ", display_value: "Debout: " });
list_options.push({ actual_value: "Cabaret: ", display_value: "Cabaret: " });
var user_input = ZDK.Client.getInput([{ type: 'picklist', label: 'Select Jauge', list_options: list_options }], 'Jauge', 'OK', 'Cancel');
