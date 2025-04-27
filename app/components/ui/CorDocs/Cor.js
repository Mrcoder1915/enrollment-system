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

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10
        },
        CourseCode: {
            width: 60,
        
        },
        CourseTitle: {
            width: 150,
        
        },
        CourseUnit: {
            width: 80,
            
        },
        Units: {
            width: "100%",
            display: 'flex',
            flexDirection: "row",
            justifyContent: "center",
            gap: 5
        },
        Section: {
            width: "40",
            
        }
    })

const Docs= () =>
        (
            <Document>
                <Page size="A4"style={Style.Page}>
                    <View style={Style.headers}>
                        <View style={Style.header1stContainer}>
                            <View style={Style.LogoContainer}>
                                <Image src="/neustlogo-nobg.png" />                          
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
                                        <Text style={{fontSize: "10px"}}>
                                            Course Code
                                        </Text>
                                    </View>
                                    <View style={Style.CourseTitle}>
                                        <Text style={{fontSize: "10px"}}>
                                            Course Title
                                        </Text>
                                    </View>
                                    <View style={Style.CourseUnit}>
                                        <Text style={{fontSize: "10px",textAlign: "center"}}>
                                            Unit
                                        </Text>
                                        <View style={Style.Units}>
                                            <Text style={{fontSize: "10px"}}>
                                                Lec
                                            </Text>
                                            <Text style={{fontSize: "10px"}}>
                                                   Lab
                                            </Text>
                                            <Text style={{fontSize: "10px"}}>
                                                Credits
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={Style.Section}>
                                        <Text style={{fontSize: "10px"}}>
                                            Section
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        )

    export default Docs
