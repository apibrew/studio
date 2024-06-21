import * as React from "react";
import { Box, Divider, Avatar } from "@mui/material";

type IconProps = {
    src: string;
    alt: string;
    extraClasses?: string;
};

const Icon: React.FC<IconProps> = ({ src, alt, extraClasses = "" }) => (
    <Box
        className={`flex justify-center items-center w-12 h-12 rounded-md ${extraClasses}`}
        sx={{ backgroundColor: "white", p: 1 }}
    >
        <img loading="lazy" src={src} alt={alt} className="w-6 aspect-square" />
    </Box>
);

export const AsideBar: React.FC = () => {
    const icons = [
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd595c7a70ceb94f3dbbd73ad4858b90d4854823883476c61c899c6757fc6788?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/afca977353e5b7ebb86784a55976a6af947f46c2a4611e63e614cc7dfac3a83c?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 2", extraClasses: "mt-2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/62cbb1de3bd06853b755b58fc73f89665daba96244cca59b07fe9f110240c367?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 3", extraClasses: "mt-2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f9185c01a40498f59fa049df760b80017ebe27e2dd47d3f02386c08473665a7?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 4", extraClasses: "mt-2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d9e494ab6d307b45d4171e9f8307e5f9e7e78fd26b780e9d1c89959a83efdc7?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 5", extraClasses: "mt-2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e301355d5c62436f84c53ac08dcf4844eb9cfa14a0279cd733a335bb9423599a?apiKey=2b9f5464ca924965bbcb304990a575fa&", alt: "Icon 6", extraClasses: "mt-2" },
    ];

    return (
        <Box
            className="flex flex-col justify-between self-stretch pt-20 max-w-[80px]"
            sx={{ width: 80 }}
        >
            <Box className="flex flex-col px-4 mt-2.5 w-full">
                {icons.map((icon, index) => (
                    <Icon key={index} src={icon.src} alt={icon.alt} extraClasses={icon.extraClasses} />
                ))}
            </Box>
            <Box className="flex flex-col px-2 pb-6 mt-96 w-full">
                <Box
                    className="flex flex-col justify-center items-start p-2 bg-white rounded-md"
                    sx={{ backgroundColor: "white", p: 1 }}
                >
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/727e1cb83bb5bd47f11b21cfab976deb51bd3279e25e7aa10272dc03f18b5b58?apiKey=2b9f5464ca924965bbcb304990a575fa&" alt="Icon 7" className="w-6 aspect-square" />
                </Box>
                <Divider className="shrink-0 mt-5" sx={{ borderBottomWidth: 1, borderColor: "grey.300" }} />
                <Box className="flex overflow-hidden relative flex-col justify-center self-center mt-6 w-full aspect-[1.33]">
                    <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4fc2617e056de289c4ad118dec0f0626a9174dce2a8cf14534d1f8a1658f83e?apiKey=2b9f5464ca924965bbcb304990a575fa&" alt="Icon 8" className="object-cover absolute inset-0 size-full" />
                    <Avatar
                        className="relative shrink-0 h-12 rounded-full"
                        sx={{ border: 1, borderColor: "black", opacity: 0.1 }}
                    />
                </Box>
            </Box>
        </Box>
    );
};
