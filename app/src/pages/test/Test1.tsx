import * as React from "react";
import {Box, Card, CardContent, CardHeader, Typography} from '@mui/material';

const MyComponent: React.FC = () => {
    return (
        <Box display="flex" bgcolor="white">
            <Box
                display={{xs: 'none', md: 'flex'}}
                flexDirection="column"
                pt="20px"
                borderRight="1px solid #E5E7EB"
            >
                <Box display="flex" flexDirection="column" p="4px">
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd595c7a70ceb94f3dbbd73ad4858b90d4854823883476c61c899c6757fc6788?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" bgcolor="#F9FAFB" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/afca977353e5b7ebb86784a55976a6af947f46c2a4611e63e614cc7dfac3a83c?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/62cbb1de3bd06853b755b58fc73f89665daba96244cca59b07fe9f110240c367?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f9185c01a40498f59fa049df760b80017ebe27e2dd47d3f02386c08473665a7?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d9e494ab6d307b45d4171e9f8307e5f9e7e78fd26b780e9d1c89959a83efdc7?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/e301355d5c62436f84c53ac08dcf4844eb9cfa14a0279cd733a335bb9423599a?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/727e1cb83bb5bd47f11b21cfab976deb51bd3279e25e7aa10272dc03f18b5b58?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" width="48px" height="48px"
                         borderRadius="4px" bgcolor="#F9FAFB" mt="8px">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4fc2617e056de289c4ad118dec0f0626a9174dce2a8cf14534d1f8a1658f83e?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                    </Box>
                </Box>
            </Box>
            <Box flex={1} p="32px" bgcolor="white">
                <Box display="flex" justifyContent="space-between" gap="20px" width="100%" mb="20px">
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="white"
                         border="1px solid #D1D5DB" boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)" borderRadius="8px"
                         p="10px 20px" cursor="pointer">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/954fbf09203eaee187e97ed6c48c8a96ae5fa786c77304da6cc59d3abe98bdd6?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                        Dashboard
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="white"
                         border="1px solid #D1D5DB" boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)" borderRadius="8px"
                         p="10px 20px" cursor="pointer">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc3dbbcdbd0d92812448fedac5878872e4acea47e1855d07ab72808373cfc29f?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                        Notification
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="white"
                         border="1px solid #D1D5DB" boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)" borderRadius="8px"
                         p="10px 20px" cursor="pointer">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/0dd992f6972b2b66c14cfcb7ea309ea7dd62c9a9e07940d239276bc9aedbdf39?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                        Feedback
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="white"
                         border="1px solid #D1D5DB" boxShadow="0px 1px 2px rgba(0, 0, 0, 0.05)" borderRadius="8px"
                         p="10px 20px" cursor="pointer">
                        <img loading="lazy"
                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/6fd369ed626bff745eeba0639a9cccf7f4d9935761d32f708e7cbcda48fc659c?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                             width="24px" height="24px"/>
                        Help
                    </Box>
                </Box>
                <Box height="2px" bgcolor="#E5E7EB" mb="16px"/>
                <Typography variant="h4" component="div" gutterBottom>Welcome back, Faiza Rzayeva</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>Lorem Ipsum dolor sit amet lorem Ipsum
                    dolor sit amet</Typography>
                <Box display="flex" flexWrap="wrap" justifyContent="space-between" mt="24px" gap="16px">
                    <Card className="card">
                        <CardHeader
                            avatar={<img loading="lazy"
                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/690f0dbfc4a23970449e70828baec111f32b48a235c80842325e956e4a86d075?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                         width="48px" height="48px"/>}
                            title="Today’s revenue"
                        />
                        <CardContent display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h3">$1,280</Typography>
                            <img loading="lazy"
                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/35c94a9b15849d347655b09aaeacf799c951003e1716bcf97b3f3848c5d97c72?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                 width="24px" height="24px"/>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader
                            avatar={<img loading="lazy"
                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/f342912ef3e9c89731b1b1001d330a46cf27bb0fd994ed113ce5639168cfafe0?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                         width="48px" height="48px"/>}
                            title="Today’s revenue"
                        />
                        <CardContent display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h3">$1,280</Typography>
                            <img loading="lazy"
                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/237c517c0c8ecaaf39fb3df157748c2e13ef0e7cef39282a1196cf41c40b1626?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                 width="24px" height="24px"/>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader
                            avatar={<img loading="lazy"
                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/24d719a7e8d82277b88d56971246f0597585615d1c869ce6cc44ea4d9a1580bf?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                         width="48px" height="48px"/>}
                            title="Today’s revenue"
                        />
                        <CardContent display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h3">$1,280</Typography>
                            <img loading="lazy"
                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fc29b84af4c180d58de77fa489b12f2f5a88d9581732259afab6c4d18103eb7?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                 width="24px" height="24px"/>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader
                            avatar={<img loading="lazy"
                                         src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9945d7e1d9735e948a217d71e0fd168c19839bb0a0b37cb9e9c6924d681cdda?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                         width="48px" height="48px"/>}
                            title="Today’s revenue"
                        />
                        <CardContent display="flex" alignItems="center" justifyContent="space-between">
                            <Typography variant="h3">$1,280</Typography>
                            <img loading="lazy"
                                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fc7368710f7fb00f03a12f2be1050844a53a0c9b146e674d80b15cfdab2d0c1?apiKey=2b9f5464ca924965bbcb304990a575fa&"
                                 width="24px" height="24px"/>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};

export default MyComponent;
