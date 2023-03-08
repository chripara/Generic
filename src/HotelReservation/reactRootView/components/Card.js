import { React, useRef } from  'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import defaultStyles from "../config/defaultStyles";
import { ArrowButton } from './ArrowButton';
import { DeleteIcon } from './DeleteIcon';

const width = Dimensions.get('window').width;

export const Card = ({ contentPair, numberOfPairs, hasDescription, deleteFunc, hasDelete }) => {

    const scrollViewRef = useRef();
    var scrollYDistance = 0;
    const step = 20;

    const changeScrollViewContent = (change, text) => {
        if(change === "up"){
            scrollViewRef.current.scrollTo({                
                y: scrollYDistance 
            })
            if(scrollYDistance > 0){
                scrollYDistance -= step }
        }
        if(change === "down"){
            scrollViewRef.current.scrollTo({                
                y: scrollYDistance
            })
            if((text.length /36-6)*20 > scrollYDistance){
                scrollYDistance += step }
        }
    }

    return(
        <View style={{ ...styles.container, ...hasDescription ? { height: numberOfPairs*65+80 } : { height: numberOfPairs*65 } }}>
            {
                hasDelete
                &&
                <View style={{ position: 'absolute', top: 20, right: 17 }}>
                    <DeleteIcon onClick={deleteFunc}/>
                </View>
            }            
            {contentPair.map((content, index) => {
                return (
                    <View>
                        <Text style={{ ...styles.textBorder, ...defaultStyles.text16White}}>{content.title}</Text>
                        {
                            (index === numberOfPairs - 1 && hasDescription )
                            ?                        
                                <View style={{height: 105, width: width*0.7}}>
                                    <ScrollView
                                        style={{height: 105, width: width*0.65}}
                                        ref={scrollViewRef}
                                    >
                                        <Text style={{ 
                                            ...styles.textBorder,
                                            ...defaultStyles.text16Black
                                            }}>
                                                {content.text}                                                
                                        </Text>
                                    </ScrollView>
                                    <View style={styles.arrowsView}>
                                        <ArrowButton
                                            attitude={"up"}
                                            size={"small"}
                                            onClick={() => {
                                                changeScrollViewContent("up", content.text)
                                            }}
                                        />
                                        <ArrowButton 
                                            attitude={"down"}
                                            size={"small"}
                                            onClick={() => { 
                                                changeScrollViewContent("down", content.text)
                                            }}
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
    withoutDescription: {
        height: 22
    },
    arrowsView: {
        height: 115,
        justifyContent: 'space-between',
        position: 'absolute',
        top: - width * 0.01,
        right: - width * 0.001
    }
});
