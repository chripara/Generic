import { useRef, useState } from  'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import fontStyles from "../config/StyleSheets/fontStyles";
import { ArrowButton } from './ArrowButton';
import { Card } from './Card';

const width = Dimensions.get('window').width;

export const List = ({ contentPair, numberOfPairs, hasDelete, deleteFunc, hasDescription }) => {
    
    const currIndex = useRef();
    
    const [randomNum, setRandomNum] = useState(0);
    
    const handleDeleteFromList = (index) => {
        deleteFunc(index);
        setRandomNum(Math.random());
        currIndex.current.scrollTo({ x: width * (index-1) });    
    }

    return (
        <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false} 
            style={{ ...hasDescription ? {height: numberOfPairs*75 + 80} :{ height: numberOfPairs*75} , width: width}}
            contentContainerStyle={styles.scrollViewContainer}
            scrollEnabled={false}
            ref={currIndex}
        >
            {contentPair.map((pairs, index) => {            
            return (      
                <View style={{justifyContent: 'center', alignItems: 'center'}}>        
                    <View  style={{ ...styles.container, flexDirection: 'column' }}>
                        { 
                            hasDelete
                            ?
                            <Card contentPair={pairs} numberOfPairs={numberOfPairs} hasDescription={true} hasDelete={true} deleteFunc={() => handleDeleteFromList(index)}/> 
                            :
                            <Card contentPair={pairs} numberOfPairs={numberOfPairs}/> 
                        }
                    </View>
                    <View style={styles.changeHotelCard}>
                        <ArrowButton
                            size={"medium"}
                            attitude={"left"}
                            onClick={() => {
                                currIndex.current.scrollTo({ x: width * (index-1) });
                            }}
                        />
                        <Text style={fontStyles.text48White}>#{index+1}</Text>
                        <ArrowButton isRight={true} 
                            size={"medium"}
                            attitude={"right"}
                            onClick={() => {
                                currIndex.current.scrollTo({ x: width * (index+1) });
                            }}
                        />
                    </View>    
                </View>
        )
        })}
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    container: {
        width: width
    },
    scrollViewContainer: {
        justifyContent: "center",
        alignSelf: "center",
        alignItems: "center"
    },
    textBorder: {
        marginVertical: 5
    },
    changeHotelCard: {
        width: width * 0.75,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
        flexDirection: 'row',
        alignSelf: 'center'
    }
});
