import { React, useRef } from  'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import defaultStyles from "../config/defaultStyles";
import { ArrowButton } from './ArrowButton';

const width = Dimensions.get('window').width;

export const Card = ({ contentPair, numberOfPairs, hasDescription }) => {

    const scrollViewRef = useRef();

    var scrollYDistance = 0;
    const step = 10;

    const changeScrollViewContent = (change) => {
        if(change === "up") {
            scrollViewRef.current.scrollTo({
                y: scrollYDistance + step 
            })
            scrollYDistance = scrollYDistance + step 
            console.log(scrollYDistance);
        }
        if(change === "down"){
            scrollViewRef.current.scrollTo({
                y: scrollYDistance - step 
            })
            scrollYDistance = scrollYDistance - step 
            console.log(scrollYDistance);
        }
    }

    return(
        <View style={{  ...styles.container, ...hasDescription ? { height: numberOfPairs*65+80 } : { height: numberOfPairs*65 } }}>
            {contentPair.map((content, index) => {
                return (
                    <View>
                        <Text style={{ ...styles.textBorder, ...defaultStyles.text16White}}>{content.title}</Text>
                        {
                            (index === 5 && hasDescription )
                            ?                        
                                <View style={{height: 115, width: width*0.7}}>
                                    <ScrollView 
                                        style={{height: 115, width: width*0.65}}
                                        ref={scrollViewRef}
                                    >
                                        <Text style={{ ...styles.textBorder, ...defaultStyles.text16Black, ...styles.descriptionStyle}}>{content.text}</Text>
                                    </ScrollView>
                                    <View style={styles.arrowsView}>
                                        <ArrowButton 
                                            attitude={"up"}
                                            size={"small"}
                                            onClick={changeScrollViewContent("up")}
                                        />
                                        <ArrowButton 
                                            attitude={"down"}
                                            size={"small"}
                                            onClick={changeScrollViewContent("down")}
                                        />
                                    </View>    
                                </View>
                            :                            
                                <Text style={{ ...styles.textBorder, ...defaultStyles.text16Black, ...styles.withoutDescription}}>{content.text}</Text> 
                        }
                    </View>                
                )
            })}
        </View>   
    )
};


const styles = StyleSheet.create({
    container: {
        width: "75%",
        backgroundColor: "#E75874",
        zIndex: 1,
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center",
        borderRadius: 25,
        paddingHorizontal: "5%"
    },
    textBorder: {
        marginVertical: 5
    },
    descriptionStyle: {
        height: 115
    },
    withoutDescription: {
        height: 22
    },
    arrowsView: {
        height: 115,
        justifyContent: 'space-between',
        position: 'absolute',
        top: width * 0.01,
        right:  - width * 0.001
    }
});
