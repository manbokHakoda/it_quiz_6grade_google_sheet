function doGet() {

    return ContentService
        .createTextOutput(
            "7-р ангийн шалгалтын Web App ажиллаж байна."
        );

}


function doPost(e) {

    try {

        const data =
            JSON.parse(
                e.postData.contents
            );


        const sheet =
            SpreadsheetApp
                .getActiveSpreadsheet()
                .getSheetByName("Sheet1");


        sheet.appendRow([

            new Date(),

            data.name || "",

            data.className || "",

            data.score || 0,

            data.total || 10,

            data.percent || 0,

            data.grade || "",

            data.duration || "",

            data.date || "",

            data.timestamp || ""

        ]);


        return ContentService

            .createTextOutput(

                JSON.stringify({

                    success: true,

                    message:
                        "Дүн амжилттай хадгалагдлаа."

                })

            )

            .setMimeType(
                ContentService.MimeType.JSON
            );


    }

    catch (error) {

        return ContentService

            .createTextOutput(

                JSON.stringify({

                    success: false,

                    error:
                        error.toString()

                })

            )

            .setMimeType(
                ContentService.MimeType.JSON
            );

    }

}
