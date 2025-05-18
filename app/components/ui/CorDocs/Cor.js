import React from 'react'
import { Document , Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer'

    const Style = StyleSheet.create({
        Page:{
            backgroundColor: "white",
            width: "100%",
            height: "100%",  
        },
        headers: {
            position: "relative",
            // backgroundColor: "red",
            width: "100%",
            height: 80, 
            display: "flex",
            flexDirection: "row",
        },
        header1stContainer: {
            position: "absolute",
            width: 150,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        LogoContainer:{
            width: 70,
            height: 70,
        },
        headerTitleCon: {
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        headerTitleConText1: {
            fontSize: "15px"
        },
        headerTitleConText2: {
            fontSize: "10px"
        },
        headerTitleConText3: {
            fontSize: "12px",
            marginTop: "15px",
            fontWeight: "bold"
        },
        Acad:{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: "0 18 0 0"
        },
        contentHeaderText: {
            fontSize: "10px"
        },
        MainContentCon: {
            width: "100%", 
            height: "75%",
            display: "flex",
            alignItems: 'center',
            justifyContent: "center"
        },
        MainContent: {
            width: "95%",
            height: "100%",
            border: "1px solid black",
            padding: 3
        },
        mainHeader: {
            width: "100%",
            backgroundColor: "#dc1212"
        },
        Information: {
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "row"
        },
        firstInfo: {
            width: "50%",
            height: "100%",
            display: 'flex',
            justifyContent: "center"
        },
        secondInfo: {
            width: "50%",
            height: "100%",
            display: 'flex',
            justifyContent: "center"
        },
        infoCon: {
            width: "100%",
            display: "flex",
            flexDirection: "row"
        },
        infoField: {
            width: "30%",
            display: "flex",
            alignItems: "flex-end",
        },
        EnrolledCon: {
            width: "100%",
            height: 200,

        },
        EnrollHeader:{
            width: "100%",
            height: 20,
            backgroundColor: "#dc1212",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        },
        CourseCode: {
            width: 60,
            fontSize: 8,
        },
        CourseTitle: {
            width: 150,
            fontSize: 8,
            wordBreak: 'break-word', // ⭐ important  
        },
        CourseUnit: {
            width: 80,

        },
        Units: {
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            fontSize: 8,
        },
        UnitsVal: {
            width: 80,
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            gap: 5,
            fontSize: 8,
        },
        Section: {
            width: "40",
            fontSize: 8
        },
        Faculty: {
            width: 100,
            fontSize: 8
        },
        EnrollContentCon: {
            width: "100%",
            marginTop: 3,
            marginBottom: 3,
            display: "flex",
            gap: 5
        },
        EnrollContent: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10
        },
        Ass_LeterCon: {
            width: "100%",
            
            display: "flex",
            flexDirection: "row",
            gap: 5
        },
        AssesCon: {
            width: "40%",
            display: "flex",
            gap: 5,
            border: "1px solid black"
        },
        LeterCon: {
            width: "60%",
            fontSize: 8,
            display: "flex",
            justifyContent: "center",
            padding: 10
        },
        AssesHeader: {
            position: "relative",
            width: "100%",
            backgroundColor: "#dc1212",
            color: "white",
            fontSize: 10,
            height: 15
        },
        AssProg: {
            fontSize: 10,
            width: "100%",
            paddingLeft: 5
        },
        FeesCon: {
            width: "100%",
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
        },
        SingleFeeCon: {
            width: "100%",
            display: "flex",
            flexDirection: "row"
        },
        FeeFieldsCon: {
            fontSize: 8,
            width: "50%",
        },
        feeCon: {
            fontSize: 8,
            width: "50%",
            display: "flex",
            alignItems: "flex-end",
        },
        TotalFee: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            fontSize: 10,
            paddingBottom: 10,
            paddingRight: 5,
            fontWeight: "bold"
        },
        SigCon: {
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            marginTop: 20
        },
        underCon: {
            width: 100,
            display: "flex",
            alignItems: "center"
        },
        Underline: {
            width: 100,
            borderBottom: 1,
            borderBottomColor: "black",
            borderBottomStyle: "solid"
        }
    })

const Docs= () =>
        (
            <Document>
                <Page size="A4"style={Style.Page}>
                    <View style={Style.headers}>
                        <View style={Style.header1stContainer}>
                            <View style={Style.LogoContainer}>
                                <Image src="/usnelogo.png" />                          
                            </View>
                        </View>
                        <View style={Style.headerTitleCon}>
                            <Text style={Style.headerTitleConText1}>
                                UNIVERSITY OF SOUTERN NUEVA ECIJA
                            </Text>
                            <Text style={Style.headerTitleConText2}>
                                San leonardo, Nueva Ecija
                            </Text>
                            <Text style={Style.headerTitleConText3}>
                                CERTIFICATE OF REGISTRATION
                            </Text>
                        </View>
                    </View>
                    <View style={Style.Acad}>
                        <Text style={Style.contentHeaderText}>
                            Academic Year/Term: <Text style={{color: "#dc1212"}}>2024-2025-2nd Semester</Text>
                        </Text>
                    </View>
                    <View style={Style.MainContentCon}>
                        <View style={Style.MainContent}>
                            <View style={Style.mainHeader}>
                                <Text style={{fontSize: "12px", textAlign: "center", color: "white"}}>Student Information</Text>
                            </View>
                            <View style={Style.Information}>
                                <View style={Style.firstInfo}>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Student ID:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>123</Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Name:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>John</Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Program:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>
                                                Bachelor Of Science And Information Technology
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Address:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>Jaen</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={Style.secondInfo}>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Year Level:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>2nd Year</Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Age:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>18</Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Sex:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>Male</Text>
                                        </View>
                                    </View>
                                    <View style={Style.infoCon}>
                                        <View style={Style.infoField}>
                                            <Text style={{fontSize: "10px",fontWeight: "bold"}}>Curriculum:</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: "8px", marginLeft: "10px"}}>BSIT 2024</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={Style.EnrolledCon}>
                                <View style={Style.EnrollHeader}>
                                    <View style={Style.CourseCode}>
                                        <Text style={{fontSize: "8px", color: "white"}}>
                                            Course Code
                                        </Text>
                                    </View>
                                    <View style={Style.CourseTitle}>
                                        <Text style={{fontSize: "8px", color: "white"}}>
                                            Course Title
                                        </Text>
                                    </View>
                                    <View style={Style.CourseUnit}>
                                        <Text style={{fontSize: "8px",textAlign: "center", color: "white"}}>
                                            Unit
                                        </Text>
                                        <View style={Style.Units}>
                                            <Text style={{fontSize: "8px", color: "white"}}>
                                                Lec
                                            </Text>
                                            <Text style={{fontSize: "8px", color: "white"}}>
                                                   Lab
                                            </Text>
                                            <Text style={{fontSize: "8px", color: "white"}}>
                                                Credits
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={Style.Section}>
                                        <Text style={{fontSize: "10px", color: "white"}}>
                                            Section
                                        </Text>
                                    </View>
                                    <View style={Style.Faculty}>
                                        <Text style={{fontSize: "10px", color: "white"}}>
                                            Faculty Signature
                                        </Text>
                                    </View>
                                </View>
                                <View style={Style.EnrollContentCon}>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                    <View style={Style.EnrollContent}>
                                        <View style={Style.CourseCode}>
                                            <Text>cc104</Text>
                                        </View>
                                        <View style={Style.CourseTitle}>
                                            <Text >Information management</Text>
                                        </View>
                                        <View style={Style.UnitsVal}>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                            <Text>1.00</Text>
                                        </View>
                                        <View style={Style.Section}>
                                            <Text >BSIT-1B</Text>
                                        </View>
                                        <View style={Style.Faculty}>
                                            <Text style={{textDecoration: "underline"}}>juan carlos</Text>
                                        </View>
                                    </View>
                                </View>
                               
                               
                            </View>
                            <View style={Style.Ass_LeterCon}>
                                    <View style={Style.AssesCon}>
                                        <View style={Style.AssesHeader}>
                                            <Text>Assessed Fees</Text>
                                        </View>
                                        <View style={Style.AssProg}>
                                            <Text>Programs</Text>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Laboratory Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>0.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Registration Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>100.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Athletic Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>790.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Development Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>245.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Library Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>100.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Tuition Fee</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>5500.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Computer Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>790.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Guidance Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>50.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Medical & Dental Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>80.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.FeesCon}>
                                            <View style={Style.SingleFeeCon}>
                                                <View style={Style.FeeFieldsCon}>
                                                    <Text>Cultural Fees</Text>
                                                </View>
                                                <View style={Style.feeCon}>
                                                    <Text>350.00</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={Style.TotalFee}>
                                            <Text>Total Assessment:     </Text>
                                            <Text>10000.00</Text>
                                        </View>
                                    </View>
                                    <View style={Style.LeterCon}>
                                            <Text>
                                                 In due consideration of my admission and enrollment, I hereby willingly abide by and comply with all the rules, regulations, policies, and guidelines duly established by the institution and the department in which I am officially enrolled. I understand that it is my responsibility to uphold the standards and principles set forth throughout my stay as a student.
                                            </Text>
                                            <View style={Style.SigCon}>
                                                <View style={Style.underCon}>
                                                    <View style={Style.Underline}></View>
                                                    <Text>Student Signature</Text>
                                                </View>
                                            </View>
                                    </View>
                                </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )

    export default Docs
