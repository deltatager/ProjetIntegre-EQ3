package com.power222.tuimspfcauppbj.service;

import com.itextpdf.kernel.colors.WebColors;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.AreaBreakType;
import com.itextpdf.layout.property.TextAlignment;
import com.power222.tuimspfcauppbj.model.Contract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStream;

@Service
public class ContractGenerationService {
    @Autowired
    public Contract contract;

    public void generateContract() throws FileNotFoundException {
        //ByteArrayOutputStream stream = new ByteArrayOutputStream();
        //PdfWriter writer = new PdfWriter(stream);
        OutputStream fos = new FileOutputStream("contract.pdf");
        PdfWriter writer = new PdfWriter(fos);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf, PageSize.A4);
        document.add(new Paragraph("CONTRAT DE STAGE").setBold().setFontSize(13)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginTop(document.getPageEffectiveArea(PageSize.A4).getHeight() / 2));
        document.add(new AreaBreak(AreaBreakType.NEXT_PAGE));
        Paragraph paragraph = new Paragraph(new Text("ENTENTE DE STAGE INTERVENUE ENTRE LES PARTIES SUIVANTES \n\n").setBold()
        ).setPaddingTop(10f)
                .add(new Text("Dans le cadre de la formule ATE, les parties citées ci-dessous:\n\n"))
                .add("Le gestionnaire de stage, [nom_gestionnaire]\n\n ")
                .add(new Text("et\n\n").setBold())
                .add(new Text("L'employeur,[nom_employeur]\n\n"))
                .add(new Text("et\n\n").setBold())
                .add(new Text("L'étudiant(e),[nom_etudiant,]\n\n"))
                .add(new Text("Conviennent des conditions de stage suivantes : "));
        document.add(paragraph.setTextAlignment(TextAlignment.CENTER));
        addIntershipInfoTable(document);
        document.add(new AreaBreak(AreaBreakType.NEXT_PAGE));
        document.add(new Paragraph(new Text("TACHES ET RESPONSABILITES DU STAGIAIRE\n")));
        float documentWidth = document.getPageEffectiveArea(PageSize.A4).getWidth();
        document.add(new Table(1).addCell(new Paragraph("[Offre description]").setWidth(documentWidth)));
        internshipPartiesResponsabilities(document);
        document.add(new Div().add(
                new Paragraph("SIGNATURES\n").setBold())
                .setBackgroundColor(WebColors.getRGBColor("#DCDCDC")).setWidth(documentWidth).setHeight(40f));
        document.add(new Paragraph(new Text("Les parties s’engagent à respecter cette entente de stage\n").setBold().setTextAlignment(TextAlignment.CENTER))
                .add(new Text("En foi de quoi les parties ont signé,\n\n").setBold())
                .add(new Text("L’étudiant(e) :\n").setBold())
                .add(new Paragraph(new Text("[signature_etudiant]")).setMarginRight(120f).setMarginBottom(0))
                .add(new Text("[date_signature_etudiant]"))
                .add(new LineSeparator(new SolidLine(1)).setMarginTop(-4)
                ));
        document.add(new LineSeparator(new SolidLine(1)).setMarginTop(-4));

        document.add(new Paragraph(new Text("[nom_etudiant]")).setMarginRight(120f).setMarginBottom(0)
                .add(new Paragraph("[Date]\n").setMarginLeft(145f)).add(new Text("\n\nL'employeur : ").setBold()));

        document.add(new Paragraph(new Text("[signature_employeur]"))
                .add(new Paragraph("[date_signature_employeur]").setMarginLeft(145f)))
                .add(new LineSeparator(new SolidLine(1)).setMarginTop(-4))
                .add(new Paragraph(new Text("[nom_employeur]"))
                        .add(new Paragraph("[Date]").setMarginLeft(145f)));

        document.add(new Paragraph("Le gestionnaire de stage :").setBold()).add(new Paragraph(new Text("[signature_gestionnaire]"))
                .add(new Paragraph("[date_signature_gestionnaire]").setMarginLeft(145f)))
                .add(new LineSeparator(new SolidLine(1)).setMarginTop(-4))
                .add(new Paragraph(new Text("[nom_gestionnaire]"))
                        .add(new Paragraph("[Date]").setMarginLeft(145f)));
        document.close();
        //System.out.println( java.util.Base64.getEncoder().encodeToString(stream.toByteArray()));
    }


    private void internshipPartiesResponsabilities(Document document) {
        document.add(new Paragraph(new Text("RESPONSABILITES\n").setBold().setTextAlignment(TextAlignment.CENTER))
                .add(new Text("Le Collège s’engage à :\n").setBold())
                .add(new Paragraph(contract.getEngagementCollege()))
                .add(new Text("L'entreprise s’engage à :\n").setBold())
                .add(new Paragraph(contract.getEngagementCompany()))
                .add(new Text("L'étudiant s’engage à :\n").setBold())
                .add(new Paragraph(contract.getEngagementStudent()))
        );
    }

    private void addIntershipInfoTable(Document document) {
        Table internshipInfoTable = new Table(1).setWidth(500f);
        internshipInfoTable.setBorder(new SolidBorder(1f));
        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("ENDROIT DU STAGE").setBold().setMultipliedLeading(1.2f).setBackgroundColor(WebColors.getRGBColor("#DCDCDC"))));
        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("Adresse: [offre_lieuStage]").setMultipliedLeading(1.2f)));

        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("DUREE DU STAGE").setBold().setMultipliedLeading(1.2f).setBackgroundColor(WebColors.getRGBColor("#DCDCDC"))));
        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("Date de début: xx\nDate de fin: xx\nNombre total de semaines: xx\n").setMultipliedLeading(1.2f)));


        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("HORAIRE DE TRAVAIL").setBold().setMultipliedLeading(1.2f).setBackgroundColor(WebColors.getRGBColor("#DCDCDC"))));
        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("Horaire de travail: xx\nNombre total d’heures par semaine: xxh\n").setMultipliedLeading(1.2f)));

        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("SALAIRE").setBold().setMultipliedLeading(1.2f).setBackgroundColor(WebColors.getRGBColor("#DCDCDC"))));
        internshipInfoTable.addCell(new Cell().setPadding(0).setBorder(Border.NO_BORDER)
                .add(new Paragraph("Salaire horaire: [offre_tauxHoraire]").setMultipliedLeading(1.2f)));
        document.add(internshipInfoTable);
    }

}
