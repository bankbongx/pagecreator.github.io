<template>
<v-app id="Newpage">
    <v-container>
        <v-content>
            <v-toolbar dense flat>
                <div class="flex-grow-1"></div>
                <v-btn text to="/library">CANCEL</v-btn>
                <v-btn text @click.stop="PreviewDialogOpen">PREVIEW
                </v-btn>
                <v-btn text @click.stop="main">EDIT</v-btn>
                <v-btn text @click="PageSave">Create
                </v-btn>
            </v-toolbar>
            <v-snackbar v-model="snackbar" top :timeout="timeout" color="teal">Success!
                <v-btn dark text @click="snackbar = false">Close</v-btn>
            </v-snackbar>
            <!--Title section editor-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 lg-height="1080px" class="d-flex align-content-center justify-center flex-wrap">
                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                        <v-col cols="12" sm="12" md="12">
                            <v-card-title>Title Section</v-card-title>
                            <template>
                                <v-btn @click.prevent="PickImage">
                                    <v-icon>mdi-camera</v-icon>Title Image
                                </v-btn>
                                <input ref="PageTitleImagePick" type="file" accept="image/*" style="display:none" @change="TitleImageSelected">
                                <v-img v-if="TitleImageURL" :src="TitleImageURL" lg-height="1080px" max-height="2200px"></v-img>
                                <button v-if="TitleImageURL" @click.prevent="PickImage">change</button>
                                <button ref="TitleRemoveButton" v-if="TitleImageURL" @click.prevent="TitleRemoveImage(TitleImageURL)">remove</button>
                            </template>
                            <v-col cols="12" sm="12" md="12">
                                <v-card-title>
                                    <v-text-field v-model="PageTitle" solo flat placeholder="ADD TITLE"></v-text-field>
                                </v-card-title>
                                <v-card-title>
                                    <v-text-field v-model="PageSubTitle" solo flat placeholder="ADD SUBTITLE"></v-text-field>
                                </v-card-title>
                            </v-col>
                        </v-col>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--Content Section Editor-->
            <!--Content Section 1-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-start flex-wrap">
                    <v-responsive :aspect-ratio="16/9" max-height="200">
                        <v-card class="mt-12 mx-auto elevation-0" flat height="auto">
                            <v-card-actions>
                                <template>
                                    <v-speed-dial v-model="fab" bottom left direction="right" transition="slide-y-reverse-transition">
                                        <template v-slot:activator>
                                            <v-btn v-model="fab" color="blue darken-2" dark fab x-small>
                                                <v-icon v-if="fab">mdi-close</v-icon>
                                                <v-icon v-else>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <!--ImageUploader-->
                                        <v-btn fab dark x-small color="green" @click.stop="ImageDialog = true">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ImageDialog" max-width="600" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                      <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelImageDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Image</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveImageSection1">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-card class="mx-auto elevation-0" height="400" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <template>
                                                            <v-btn @click="PickImage1">
                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                            </v-btn>
                                                            <input ref="ImagePickContent1" type="file" accept="image/*" style="display:none" @change="ImageAddSubmit1">
                                                            <v-img v-if="ImageAddReturnURL1" :src="ImageAddReturnURL1"></v-img>
                                                            <button v-if="ImageAddReturnURL1" @click.prevent="PickImage1">change</button>
                                                            <button ref="ImageRemoveButton1" v-if="ImageAddReturnURL1" @click.prevent="RemoveImageContentDialog1()">remove</button>
                                                        </template>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Text Editor-->
                                        <v-btn fab dark x-small color="indigo" @click.stop="TextDialog = true">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="TextDialog" hide-overlay transition="dialog-bottom-transition">
                                            <v-card height="400">
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelTextDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Text</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="TextAddSubmit">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <template>
                                                    <div><tiptap-vuetify placeholder="Text Here" v-model="TextContent1" :extensions="extensions" /></div>
                                                </template>
                                            </v-card>
                                        </v-dialog>
                                        <!--CarouselUploader-->
                                        <v-btn fab dark x-small color="teal" @click.stop="CarouselDialog = true">
                                            <v-icon>mdi-image-filter</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="CarouselDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelCarouselDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Limit 4 Images</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveCarouselSection1">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-form>
                                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-list>
                                                                <v-list-item>
                                                                    <v-list-item-content>
                                                                        <template>
                                                                            <v-btn @click="CarouselPickImage1">
                                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                                            </v-btn>
                                                                            <input id="CarouselImagePickContent1" ref="CarouselImagePickContent1" type="file" accept="image/*" style="display:none" multiple @change="CarouselFileSelect">
                                                                            <button v-if="CarouselAddReturnURL1.length !== 0" @click.prevent="CarouselPickImage1">change</button>
                                                                            <button ref="CarouselImageRemoveButton1" v-if="CarouselAddReturnURL1.length !== 0" @click.prevent="RemoveCarouselContentDialog1()">remove</button>
                                                                        </template>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item v-for="item in CarouselAddReturnURL1" :key="item">
                                                                    <v-img :src="item" class="thumbnail"></v-img>
                                                                </v-list-item>
                                                            </v-list>
                                                            <v-list>
                                                            </v-list>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-card>
                                        </v-dialog>
                                        <!--Video Add-->
                                        <v-btn fab dark x-small color="red" @click.stop="VideoDialog = true">
                                            <v-icon>mdi-youtube</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="VideoDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelVideoDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Embed Video</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="VideoAddSubmit">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title> Only 1 content type for 1 section </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="VideoURLAdd1" clearable label="Add Youtube Link " placeholder="https://www.youtube.com/watch?v=<id>"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Button Add-->
                                        <v-btn fab dark x-small color="light-blue" @click.stop="ButtonDialog = true">
                                            <v-icon>mdi-link</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ButtonDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelButtonDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Button</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="ButtonAddSubmit">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title> Only 1 content type for 1 section </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field clearable placeholder="Button Name" v-model="ButtonNameAdd1"></v-text-field>
                                                        <v-text-field clearable placeholder="URL" v-model="ButtonURLAdd1"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Link Add-->
                                        <v-btn fab dark x-small color="pink" @click.stop="LinkDialog = true">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="LinkDialog" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelLinkDialog1">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Link</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="LinkAddSubmit">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title> Only 1 content type for 1 section </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-form>
                                                            <v-text-field clearable v-model="LinkURLAdd1" label="Edit link" placeholder="www.example.com"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                    </v-speed-dial>
                                </template>
                            </v-card-actions>
                        </v-card>
                    </v-responsive>
                </v-flex>
            </v-layout>
            <!--Result of  Each  Content Section template -->
            <!--Section 1-->
            <!--Link Added Display-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <v-card v-if="LinkURLAddReturn1">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection2" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title><a href="{ LinkURLAddReturn1 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn1 }}</a></v-card-title>
                    </v-card>
                    <!--Button Added Display-->
                    <v-card v-if="ButtonAddReturn1">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection2" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <v-btn href='{ ButtonURLAdd1 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn1 }}</v-btn>
                        </v-card-title>
                    </v-card>
                    <!--Image Added Display-->
                    <v-card title="Returned values:" v-if="ImageAddReturnURL1 && ImageActiveSection1 === true">
                        <template>
                            <v-btn v-if="ImageActiveSection1 === true" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-img :src="ImageAddReturnURL1"></v-img>
                    </v-card>
                    <!--Carousel Added Display-->
                    <v-card title="Returned values:" v-if="CarouselAddReturnURL1.length !== 0 && ActivatedSection2">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection2" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>Carousel added</v-card-title>
                        <v-carousel hide-delimiters cycle continuous>
                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL1" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                    </v-card>
                    <!--Video Added  Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="VideoAddReturn1">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection2" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <youtube :video-id="1" player-width="auto" player-height="auto"></youtube>
                    </v-card>
                    <!--Text Added Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="TextAddReturn1 === true">
                        <div>
                            <template>
                                <v-btn top left v-if="ActivatedSection2" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection1">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </template>
                            <v-divider />
                            <div class="tiptap-vuetify-editor__content" v-html="TextContent1" />
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--Content Section 2 Editor-->
            <v-layout row wrap v-if="ActivatedSection2 ">
                <v-flex xs12 sm12 md12 class="d-flex align-content-start flex-wrap">
                    <v-responsive :aspect-ratio="16/9" max-height="200">
                        <v-card class="mt-12 mx-auto elevation-0" flat height="auto">
                            <v-card-actions>
                                <template>
                                    <v-speed-dial v-model="fab2" bottom left direction="right" transition="slide-y-reverse-transition">
                                        <template v-slot:activator>
                                            <v-btn v-model="fab2" color="blue darken-2" dark fab x-small>
                                                <v-icon v-if="fab2">mdi-close</v-icon>
                                                <v-icon v-else>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <!--ImageUploader-->
                                        <v-btn fab dark x-small color="green" @click.stop="ImageDialog2 = true">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ImageDialog2" max-width="600" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                       <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelImageDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Image</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveImageSection2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-card class="mx-auto elevation-0" height="400" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <template>
                                                            <v-btn @click="PickImage2">
                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                            </v-btn>
                                                            <input ref="ImagePickContent2" type="file" accept="image/*" style="display:none" @change="ImageAddSubmit2">
                                                            <v-img v-if="ImageAddReturnURL2" :src="ImageAddReturnURL2"></v-img>
                                                            <button v-if="ImageAddReturnURL2" @click.prevent="PickImage2">change</button>
                                                            <button ref="ImageRemoveButton2" v-if="ImageAddReturnURL2" @click.prevent="RemoveImageContentDialog2()">remove</button>
                                                        </template>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Text Editor-->
                                        <v-btn fab dark x-small color="indigo" @click.stop="TextDialog2 = true">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="TextDialog2" hide-overlay transition="dialog-bottom-transition">
                                            <v-card height="400">
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelTextDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Text</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="TextAddSubmit2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <template>
                                                    <div><tiptap-vuetify placeholder="Text Here" v-model="TextContent2" :extensions="extensions" /></div>
                                                </template>
                                            </v-card>
                                        </v-dialog>
                                        <!--CarouselUploader-->
                                        <v-btn fab dark x-small color="teal" @click.stop="CarouselDialog2 = true">
                                            <v-icon>mdi-image-filter</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="CarouselDialog2" fullscreen hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelCarouselDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Limit 4 Images</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveCarouselSection2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-form>
                                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-list>
                                                                <v-list-item>
                                                                    <v-list-item-content><template>
                                                                            <v-btn @click="CarouselPickImage2">
                                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                                            </v-btn>
                                                                            <input id="CarouselImagePickContent2" ref="CarouselImagePickContent2" type="file" accept="image/*" style="display:none" multiple @change="CarouselFileSelect2">

                                                                            <button v-if="CarouselAddReturnURL2.length !== 0" @click.prevent="CarouselPickImage2">change</button>

                                                                            <button ref="CarouselImageRemoveButton2" v-if="CarouselAddReturnURL2.length !== 0" @click.prevent="RemoveCarouselContentDialog2(CarouselAddReturnURL2)">remove</button>
                                                                        </template>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item v-for="item in CarouselAddReturnURL2" :key="item">
                                                                    <v-img :src="item" class="thumbnail"></v-img>
                                                                </v-list-item>
                                                            </v-list>
                                                            <v-list>
                                                            </v-list>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-card>
                                        </v-dialog>
                                        <!--Video Add-->
                                        <v-btn fab dark x-small color="red" @click.stop="VideoDialog2 = true">
                                            <v-icon>mdi-youtube</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="VideoDialog2" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelVideoDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Embed Video</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="VideoAddSubmit2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="VideoURLAdd2" clearable label="Add Youtube Link " placeholder="www.youtube.com/watch?v=<id>"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Button Add-->
                                        <v-btn fab dark x-small color="light-blue" @click.stop="ButtonDialog2 = true">
                                            <v-icon>mdi-link</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ButtonDialog2" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelButtonDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Button</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="ButtonAddSubmit2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field clearable placeholder="Button Name" v-model="ButtonNameAdd2"></v-text-field>
                                                        <v-text-field clearable placeholder="URL" v-model="ButtonURLAdd2"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Link Add-->
                                        <v-btn fab dark x-small color="pink" @click.stop="LinkDialog2 = true">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="LinkDialog2" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelLinkDialog2">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Link</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="LinkAddSubmit2">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title> Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-form>
                                                            <v-text-field clearable v-model="LinkURLAdd2" label="Edit link" placeholder="www.example.com"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                    </v-speed-dial>
                                </template>
                            </v-card-actions>
                        </v-card>
                    </v-responsive>
                </v-flex>
            </v-layout>
            <!--Section 2-->
            <!--Link Added Display-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <v-card v-if="LinkURLAddReturn2">
                        <template>
                            <v-btn v-if="ActivatedSection3" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <a href="{ LinkURLAddReturn2 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn2 }}</a>
                        </v-card-title>
                    </v-card>
                    <!--Button Added Display-->
                    <v-card v-if="ButtonAddReturn2">
                        <template>
                            <v-btn x-small dark fab class="ml-5" color="red" @click="RemoveContentSection2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <v-btn href='{ ButtonURLAdd2 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn2 }}</v-btn>
                        </v-card-title>
                    </v-card>
                    <!--Image Added Display-->
                    <v-card title="Returned values:" v-if="ImageAddReturnURL2 && ImageActiveSection2 === true">
                        <template>
                            <v-btn v-if="ImageActiveSection2 === true" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-img :src="ImageAddReturnURL2"></v-img>
                    </v-card>
                    <!--Carousel Added Display-->
                    <v-card title="Returned values:" v-if="CarouselAddReturnURL2.length !== 0 && ActivatedSection3">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection3" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>Carousel added</v-card-title>
                        <v-carousel hide-delimiters cycle continuous>
                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL2" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                    </v-card>
                    <!--Video Added  Display-->
                    <v-card xs12 sm12 md12 lg12 title="Returned values:" v-if="VideoAddReturn2">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>{{ VideoAddReturn2 }}</v-card-title>
                        <youtube :video-id="VideoId2" player-width="auto" player-height="auto"></youtube>
                    </v-card>
                    <!--Text Added Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="TextAddReturn2 === true">
                        <div>
                            <template>
                                <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection2">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </template>
                            <v-divider />
                            <div class="tiptap-vuetify-editor__content" v-html="content2" />
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--Content Section 3-->
            <v-layout row wrap v-if="ActivatedSection3">
                <v-flex xs12 sm12 md12 class="d-flex align-content-start flex-wrap">
                    <v-responsive :aspect-ratio="16/9" max-height="200">
                        <v-card class="mt-12 mx-auto elevation-0" flat height="auto">
                            <!--<v-card-title>Content Section 3</v-card-title>-->
                            <v-card-actions>
                                <template>
                                    <v-speed-dial v-model="fab3" bottom left direction="right" transition="slide-y-reverse-transition">
                                        <template v-slot:activator>
                                            <v-btn v-model="fab3" color="blue darken-2" dark fab x-small>
                                                <v-icon v-if="fab3">mdi-close</v-icon>
                                                <v-icon v-else>mdi-plus</v-icon>

                                            </v-btn>
                                        </template>
                                        <!--ImageUploader-->
                                        <v-btn fab dark x-small color="green" @click.stop="ImageDialog3 = true">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ImageDialog3" max-width="600" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                       <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelImageDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Image</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveImageSection3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-card class="mx-auto elevation-0" height="400" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <template>
                                                            <v-btn @click="PickImage3">
                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                            </v-btn>
                                                            <input ref="ImagePickContent3" type="file" accept="image/*" style="display:none" @change="ImageAddSubmit3">
                                                            <v-img v-if="ImageAddReturnURL3" :src="ImageAddReturnURL3"></v-img>
                                                            <button v-if="ImageAddReturnURL3" @click.prevent="PickImage3">change</button>
                                                            <button ref="ImageRemoveButton3" v-if="ImageAddReturnURL3" @click.prevent="RemoveImageContentDialog3()">remove</button>
                                                        </template>

                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Text Editor-->
                                        <v-btn fab dark x-small color="indigo" @click.stop="TextDialog3 = true">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="TextDialog3" hide-overlay transition="dialog-bottom-transition">
                                            <v-card height="400">
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelTextDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Text</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="TextAddSubmit3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title> Only 1 content type for 1 section</v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <template>
                                                    <div><tiptap-vuetify placeholder="Text Here" v-model="TextContent3" :extensions="extensions" /></div>
                                                </template>
                                            </v-card>
                                        </v-dialog>
                                        <!--CarouselUploader-->
                                        <v-btn fab dark x-small color="teal" @click.stop="CarouselDialog3 = true">
                                            <v-icon>mdi-image-filter</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="CarouselDialog3" fullscreen hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelCarouselDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Limit 4 Images</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveCarouselSection3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>Only 1 content type for 1 section </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close</v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-form>
                                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-list>
                                                                <v-list-item>
                                                                    <v-list-item-content><template>
                                                                            <v-btn @click="CarouselPickImage3">
                                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                                            </v-btn>
                                                                            <input id="CarouselImagePickContent3" ref="CarouselImagePickContent3" type="file" accept="image/*" style="display:none" multiple @change="CarouselFileSelect3">
                                                                            <button v-if="CarouselAddReturnURL3.length !== 0" @click.prevent="CarouselPickImage3">change</button>
                                                                            <button ref="CarouselImageRemoveButton3" v-if="CarouselAddReturnURL3.length !== 0" @click.prevent="RemoveCarouselContentDialog3(CarouselAddReturnURL3)">remove</button>
                                                                        </template>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item v-for="item in CarouselAddReturnURL3" :key="item">
                                                                    <v-img :src="item" class="thumbnail"></v-img>
                                                                </v-list-item>
                                                            </v-list>
                                                            <v-list>
                                                            </v-list>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-card>
                                        </v-dialog>
                                        <!--Video Add-->
                                        <v-btn fab dark x-small color="red" @click.stop="VideoDialog3 = true">
                                            <v-icon>mdi-youtube</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="VideoDialog3" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelVideoDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Embed Video</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="VideoAddSubmit3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="VideoURLAdd3" clearable label="Add Youtube Link " placeholder="www.youtube.com/watch?v=<id>"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Button Add-->
                                        <v-btn fab dark x-small color="light-blue" @click.stop="ButtonDialog3 = true">
                                            <v-icon>mdi-link</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ButtonDialog3" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelButtonDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Button</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="ButtonAddSubmit3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field clearable placeholder="Button Name" v-model="ButtonNameAdd3"></v-text-field>
                                                        <v-text-field clearable placeholder="URL" v-model="ButtonURLAdd3"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Link Add-->
                                        <v-btn fab dark x-small color="pink" @click.stop="LinkDialog3 = true">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="LinkDialog3" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelLinkDialog3">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Link</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="LinkAddSubmit3">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-form>
                                                            <v-text-field clearable v-model="LinkURLAdd3" label="Edit link" placeholder="www.example.com"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                    </v-speed-dial>
                                </template>
                            </v-card-actions>
                        </v-card>
                    </v-responsive>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <!--Section 3 Display-->
                    <!--Link Added Display-->
                    <v-card v-if="LinkURLAddReturn3">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <a href="{ LinkURLAddReturn3 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn3 }}</a>
                        </v-card-title>
                    </v-card>
                    <!--Button Added Display-->
                    <v-card v-if="ButtonAddReturn3">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <v-btn href='{ ButtonURLAdd3 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn3 }}</v-btn>
                        </v-card-title>
                    </v-card>
                    <!--Image Added Display-->
                    <v-card title="Returned values:" v-if="ImageAddReturnURL3 && ImageActiveSection3 === true">
                        <template>
                            <v-btn v-if="ImageActiveSection3 === true" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-img :src="ImageAddReturnURL3"></v-img>
                    </v-card>
                    <!--Carousel Added Display-->
                    <v-card title="Returned values:" v-if="CarouselAddReturnURL3.length !== 0 && ActivatedSection4">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection4" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>Carousel added</v-card-title>
                        <v-carousel hide-delimiters cycle continuous>
                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL3" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                    </v-card>
                    <!--Video Added  Display-->
                    <v-card xs12 sm12 md12 lg12 title="Returned values:" v-if="VideoAddReturn3">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>{{ VideoAddReturn3 }}</v-card-title>
                        <youtube :video-id="VideoId3" player-width="auto" player-height="auto"></youtube>
                    </v-card>
                    <!--Text Added Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="TextAddReturn3 === true">
                        <div>
                            <template>
                                <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection3">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </template>
                            <v-divider />
                            <div class="tiptap-vuetify-editor__content" v-html="TextContent3" />
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--Content Section 4  Editor-->
            <v-layout row wrap v-if="ActivatedSection4">
                <v-flex xs12 sm12 md12 class="d-flex align-content-start flex-wrap">
                    <v-responsive :aspect-ratio="16/9" max-height="200">
                        <v-card class="mt-12 mx-auto elevation-0" flat height="auto">
                            <!--<v-card-title>Content Section 4</v-card-title>-->
                            <v-card-actions>
                                <template>
                                    <v-speed-dial v-model="fab4" bottom left direction="right" transition="slide-y-reverse-transition">
                                        <template v-slot:activator>
                                            <v-btn v-model="fab4" color="blue darken-2" dark fab x-small>
                                                <v-icon v-if="fab4">mdi-close</v-icon>
                                                <v-icon v-else>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <!--ImageUploader-->
                                        <v-btn fab dark x-small color="green" @click.stop="ImageDialog4 = true">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ImageDialog4" max-width="600" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                       <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelImageDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Image</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveImageSection4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-card class="mx-auto elevation-0" height="400" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <template>
                                                            <v-btn @click="PickImage4">
                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                            </v-btn>
                                                            <input ref="ImagePickContent4" type="file" accept="image/*" style="display:none" @change="ImageAddSubmit4">
                                                            <v-img v-if="ImageAddReturnURL4" :src="ImageAddReturnURL4"></v-img>
                                                            <button v-if="ImageAddReturnURL4" @click.prevent="PickImage4">change</button>
                                                            <button ref="ImageRemoveButton4" v-if="ImageAddReturnURL4" @click.prevent="RemoveImageContentDialog4()">remove</button>
                                                        </template>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Text Editor-->
                                        <v-btn fab dark x-small color="indigo" @click.stop="TextDialog4 = true">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="TextDialog4" hide-overlay transition="dialog-bottom-transition">
                                            <v-card height="400">
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelTextDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Text</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="TextAddSubmit4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <template>
                                                    <div><tiptap-vuetify placeholder="Text Here" v-model="TextContent4" :extensions="extensions" /></div>
                                                </template>
                                            </v-card>
                                        </v-dialog>
                                        <!--CarouselUploader-->
                                        <v-btn fab dark x-small color="teal" @click.stop="CarouselDialog4 = true">
                                            <v-icon>mdi-image-filter</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="CarouselDialog4" fullscreen hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelCarouselDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Limit 4 Images</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveCarouselSection4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-form>
                                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-list>
                                                                <v-list-item>
                                                                    <v-list-item-content>
                                                                        <template>
                                                                            <v-btn @click="CarouselPickImage4">
                                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                                            </v-btn>
                                                                            <input id="CarouselImagePickContent4" ref="CarouselImagePickContent4" type="file" accept="image/*" style="display:none" multiple @change="CarouselFileSelect4">
                                                                            <button v-if="CarouselAddReturnURL4.length !== 0" @click.prevent="CarouselPickImage4">change</button>
                                                                            <button ref="CarouselImageRemoveButton4" v-if="CarouselAddReturnURL4.length !== 0" @click.prevent="RemoveCarouselContentDialog24(CarouselAddReturnURL4)">remove</button>
                                                                        </template>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item v-for="item in CarouselAddReturnURL4" :key="item">
                                                                    <v-img :src="item" class="thumbnail"></v-img>
                                                                </v-list-item>
                                                            </v-list>
                                                            <v-list>
                                                            </v-list>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-card>
                                        </v-dialog>
                                        <!--Video Add-->
                                        <v-btn fab dark x-small color="red" @click.stop="VideoDialog4 = true">
                                            <v-icon>mdi-youtube</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="VideoDialog4" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelVideoDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Embed Video</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="VideoAddSubmit4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="VideoURLAdd4" clearable label="Add Youtube Link " placeholder="www.youtube.com/watch?v=<id>"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Button Add-->
                                        <v-btn fab dark x-small color="light-blue" @click.stop="ButtonDialog4 = true">
                                            <v-icon>mdi-link</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ButtonDialog4" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelButtonDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Button</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="ButtonAddSubmit4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">
                                                                Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field clearable placeholder="Button Name" v-model="ButtonNameAdd4"></v-text-field>
                                                        <v-text-field clearable placeholder="URL" v-model="ButtonURLAdd4"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Link Add-->
                                        <v-btn fab dark x-small color="pink" @click.stop="LinkDialog4 = true">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="LinkDialog4" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelLinkDialog4">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Link</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="LinkAddSubmit4">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-form>
                                                            <v-text-field clearable v-model="LinkURLAdd4" label="Edit link" placeholder="www.example.com"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                    </v-speed-dial>
                                </template>
                            </v-card-actions>
                        </v-card>
                    </v-responsive>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <!--Section 4 Display-->
                    <!--Link Added Display-->
                    <v-card v-if="LinkURLAddReturn4">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <a href="{ LinkURLAddReturn4 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn4 }}</a>
                        </v-card-title>
                    </v-card>
                    <!--Button Added Display-->
                    <v-card v-if="ButtonAddReturn4">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <v-btn href='{ ButtonURLAdd4 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn4 }}</v-btn>
                        </v-card-title>
                    </v-card>
                    <!--Image Added Display-->
                    <v-card title="Returned values:" v-if="ImageAddReturnURL4 && ImageActiveSection4 === true">
                        <template>
                            <v-btn v-if="ImageActiveSection4 === true" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-img :src="ImageAddReturnURL4"></v-img>
                    </v-card>
                    <!--Carousel Added Display-->
                    <v-card title="Returned values:" v-if="CarouselAddReturnURL4.length !== 0 && ActivatedSection5">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection5" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>Carousel added</v-card-title>
                        <v-carousel hide-delimiters cycle continuous>
                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL4" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                    </v-card>
                    <!--Video Added  Display-->
                    <v-card xs12 sm12 md12 lg12 title="Returned values:" v-if="VideoAddReturn4">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>{{ VideoAddReturn4 }}</v-card-title>
                        <youtube :video-id="VideoId4" player-width="auto" player-height="auto"></youtube>
                    </v-card>
                    <!--Text Added Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="TextAddReturn4 === true">
                        <div>
                            <!--<h3 class="mt-4 primary--text">Preview</h3>-->
                            <template>
                                <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection4">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </template>
                            <v-divider />
                            <div class="tiptap-vuetify-editor__content" v-html="TextContent4" />
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--Content Section 5 Editor-->
            <v-layout row wrap v-if="ActivatedSection5">
                <v-flex xs12 sm12 md12 class="d-flex align-content-start flex-wrap">
                    <v-responsive :aspect-ratio="16/9" max-height="200">
                        <v-card class="mt-12 mx-auto elevation-0" flat height="auto">
                            <!--<v-card-title>Content Section 5</v-card-title>-->
                            <v-card-actions>
                                <template>
                                    <v-speed-dial v-model="fab5" bottom left direction="right" transition="slide-y-reverse-transition">
                                        <template v-slot:activator>
                                            <v-btn v-model="fab5" color="blue darken-2" dark fab x-small>
                                                <v-icon v-if="fab5">mdi-close</v-icon>
                                                <v-icon v-else>mdi-plus</v-icon>
                                            </v-btn>
                                        </template>
                                        <!--ImageUploader-->
                                        <v-btn fab dark x-small color="green" @click.stop="ImageDialog5 = true">
                                            <v-icon>mdi-image</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ImageDialog5" max-width="600" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelImageDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Image</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer></v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveImageSection5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-card class="mx-auto elevation-0" height="400" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <template>
                                                            <v-btn @click="PickImage5">
                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                            </v-btn>
                                                            <input ref="ImagePickContent5" type="file" accept="image/*" style="display:none" @change="ImageAddSubmit5">
                                                            <v-img v-if="ImageAddReturnURL5" :src="ImageAddReturnURL5"></v-img>
                                                            <button v-if="ImageAddReturnURL5" @click.prevent="PickImage5">change</button>
                                                            <button ref="ImageRemoveButton5" v-if="ImageAddReturnURL5" @click.prevent="RemoveImageContentDialog5()">remove</button>
                                                        </template>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Text Editor-->
                                        <v-btn fab dark x-small color="indigo" @click.stop="TextDialog5 = true">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="TextDialog5" hide-overlay transition="dialog-bottom-transition">
                                            <v-card height="400">
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelTextDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Text</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="TextAddSubmit5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <template>
                                                    <div><tiptap-vuetify placeholder="Text Here" v-model="TextContent5" :extensions="extensions" /></div>
                                                </template>
                                            </v-card>
                                        </v-dialog>
                                        <!--CarouselUploader-->
                                        <v-btn fab dark x-small color="teal" @click.stop="CarouselDialog5 = true">
                                            <v-icon>mdi-image-filter</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="CarouselDialog5" fullscreen hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelCarouselDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Limit 4 Images</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="SaveCarouselSection5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-form>
                                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                        <v-col cols="12" sm="12" md="3">
                                                            <v-list>
                                                                <v-list-item>
                                                                    <v-list-item-content>
                                                                        <template>
                                                                            <v-btn @click="CarouselPickImage5">
                                                                                <v-icon>mdi-camera</v-icon>Upload Image
                                                                            </v-btn>
                                                                            <input id="CarouselImagePickContent5" ref="CarouselImagePickContent5" type="file" accept="image/*" style="display:none" multiple @change="CarouselFileSelect5">
                                                                            <button v-if="CarouselAddReturnURL5.length !== 0" @click.prevent="CarouselPickImage5">change</button>
                                                                            <button ref="CarouselImageRemoveButton5" v-if="CarouselAddReturnURL5.length !== 0" @click.prevent="RemoveCarouselContentDialog5(CarouselAddReturnURL5)">remove</button>
                                                                        </template>
                                                                    </v-list-item-content>
                                                                </v-list-item>
                                                                <v-list-item v-for="item in CarouselAddReturnURL5" :key="item">
                                                                    <v-img :src="item" class="thumbnail"></v-img>
                                                                </v-list-item>
                                                            </v-list>
                                                            <v-list>
                                                            </v-list>
                                                        </v-col>
                                                    </v-card>
                                                </v-form>
                                            </v-card>
                                        </v-dialog>
                                        <!--Video Add-->
                                        <v-btn fab dark x-small color="red" @click.stop="VideoDialog5 = true">
                                            <v-icon>mdi-youtube</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="VideoDialog5" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelVideoDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Embed Video</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="VideoAddSubmit5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field v-model="VideoURLAdd5" clearable label="Add Youtube Link " placeholder="www.youtube.com/watch?v=<id>"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Button Add-->
                                        <v-btn fab dark x-small color="light-blue" @click.stop="ButtonDialog5 = true">
                                            <v-icon>mdi-link</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="ButtonDialog5" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelButtonDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Button</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="ButtonAddSubmit5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-text-field clearable placeholder="Button Name" v-model="ButtonNameAdd5"></v-text-field>
                                                        <v-text-field clearable placeholder="URL" v-model="ButtonURLAdd5"></v-text-field>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                        <!--Link Add-->
                                        <v-btn fab dark x-small color="pink" @click.stop="LinkDialog5 = true">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                        <v-dialog v-model="LinkDialog5" max-width="400" hide-overlay transition="dialog-bottom-transition">
                                            <v-card>
                                                <v-toolbar dark color="primary">
                                                    <v-btn icon dark @click="CancelLinkDialog5">
                                                        <v-icon>mdi-close</v-icon>
                                                    </v-btn>
                                                    <v-toolbar-title>Add Link</v-toolbar-title>
                                                    <div class="flex-grow-1"></div>
                                                    <v-spacer>
                                                    </v-spacer>
                                                    <v-toolbar-items>
                                                        <v-btn dark text @click="LinkAddSubmit5">Save</v-btn>
                                                    </v-toolbar-items>
                                                </v-toolbar>
                                                <v-dialog v-model="OnlyOneContentAddDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title>
                                                            Only 1 content type for 1 section
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="OnlyOneContentAddDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                     <v-dialog v-model="AddContentDialog" max-width="500px">
                                                    <v-card>
                                                        <v-card-title class="row wrap">
                                                            Please Add Content
                                                        </v-card-title>
                                                        <v-card-actions>
                                                            <v-btn color="primary" text @click="AddContentDialog = false">Close
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-card>
                                                </v-dialog>
                                                <v-card class="mx-auto elevation-0" blue-grey lighten-3>
                                                    <v-col cols="12" sm="12" md="12">
                                                        <v-form>
                                                            <v-text-field clearable v-model="LinkURLAdd5" label="Edit link" placeholder="www.example.com"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-card>
                                            </v-card>
                                        </v-dialog>
                                    </v-speed-dial>
                                </template>
                            </v-card-actions>
                        </v-card>
                    </v-responsive>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <!--Section 5 Display-->
                    <!--Link Added Display-->
                    <v-card v-if="LinkURLAddReturn5">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <a href="{ LinkURLAddReturn5 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn5 }}</a>
                        </v-card-title>
                    </v-card>
                    <!--Button Added Display-->
                    <v-card v-if="ButtonAddReturn5">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>
                            <v-btn href='{ ButtonURLAdd5 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn5 }}</v-btn>
                        </v-card-title>
                    </v-card>
                    <!--Image Added Display-->
                    <v-card title="Returned values:" v-if="ImageAddReturnURL5 && ImageActiveSection5 === true">
                        <template>
                            <v-btn v-if="ImageActiveSection5 === true" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-img :src="ImageAddReturnURL5"></v-img>
                    </v-card>
                    <!--Carousel Added Display-->
                    <v-card title="Returned values:" v-if="CarouselAddReturnURL5.length !== 0 && ActivatedSection5">
                        <template>
                            <v-btn bottom left v-if="ActivatedSection5" class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>Carousel added</v-card-title>
                        <v-carousel hide-delimiters cycle continuous>
                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL5" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                        </v-carousel>
                    </v-card>
                    <!--Video Added  Display-->
                    <v-card xs12 sm12 md12 lg12 title="Returned values:" v-if="VideoAddReturn5">
                        <template>
                            <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                        </template>
                        <v-card-title>{{ VideoAddReturn5 }}</v-card-title>
                        <youtube :video-id="VideoId5" player-width="auto" player-height="auto"></youtube>
                    </v-card>
                    <!--Text Added Display-->
                    <v-card xs12 sm12 md12 lg12 v-if="TextAddReturn5 === true">
                        <div>
                            <template>
                                <v-btn class="ml-5" x-small dark fab color="red" @click="RemoveContentSection5">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                            </template>
                            <v-divider />
                            <div class="tiptap-vuetify-editor__content" v-html="TextContent5" />
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
            <!--------------------------------------------------------------------------------------->
            <!--Preview Dialog page-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap">
                    <template>
                        <v-dialog v-model="PreviewDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                            <v-card>
                                <!--toolbar-->
                                <v-toolbar dark color="primary">
                                    <v-btn icon dark @click="PreviewDialog = false">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-toolbar-title>Preview</v-toolbar-title>
                                    <div class="flex-grow-1"></div>
                                    <v-spacer></v-spacer>
                                    <!-------Save Event---------------------------->
                                    <v-toolbar-items>
                                        <v-btn dark text @click="PageSave">Save</v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                                <!--Title Section Card-->
                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                    <v-card class="mx-auto elevation-0" blue-grey lighten-3 lg-height="1080px">
                                        <v-card flat title="Returned values:" v-if="TitleImageURL">
                                            <v-img :src="TitleImageURL" class="white--text justify-center align-center">
                                                <v-col cols="12" sm="12" md="12">
                                                    <!--Title-->
                                                    <v-card-title class="justify-center align-self-center">
                                                        <h1>{{ PageTitle }}</h1></v-card-title>
                                                    <!--Subtitle-->
                                                    <v-card-title class="justify-center align-self-center">{{ PageSubTitle }}</v-card-title>
                                                </v-col>
                                            </v-img>
                                        </v-card>
                                    </v-card>
                                </v-responsive>
                                <!--Content Section 1 dispaly only 1 content type template-->
                                <!--Section 1 Content Type Image template-->
                                <v-card flat class="mt-5 d-flex align-content-center justify-center flex-wrap" title="Content Section 1:">
                                    <!--Section 1 Image Card -->
                                    <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL1">
                                        <v-img :src="ImageAddReturnURL1" class="white--text"> </v-img>
                                    </v-card>
                                    <!--Section 1 Text Card-->
                                    <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn1 === true">
                                        <div class="tiptap-vuetify-editor__content" v-html="TextContent1" />
                                    </v-card>
                                    <!--Section 1 Carousel  Card-->
                                    <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn1.length !== 0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                                    <v-card flat class="mt-4 mx-auto elevation-0">
                                                        <v-carousel hide-delimiters cycle continuous>
                                                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL1" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                                                        </v-carousel>
                                                    </v-card>
                                                </v-responsive>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <!--Section 1 Video Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5 d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center" title="Content Type Video" v-if="VideoAddReturn1">
                                        <youtube :video-id="VideoId1" player-width="auto" player-height="auto"></youtube>
                                    </v-card>
                                    <!--Section 1 Button Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn1">
                                        <v-card-title>
                                            <v-btn href='{ ButtonURLAdd1 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn1 }}</v-btn>
                                        </v-card-title>
                                    </v-card>
                                    <!--Section 1 Link Card -->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn1">
                                        <v-card-title>
                                            <a href="{ LinkURLAddReturn1 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn1 }}</a>
                                        </v-card-title>
                                    </v-card>
                                </v-card>
                                <!--Content Section 2 dispaly only 1 content type template-->
                                <!--Section 2 Content Type Image template-->
                                <v-card flat class="mt-5" title="Content Section 2:">
                                    <!--Section 2 Image Card -->
                                    <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL2">
                                        <v-img :src="ImageAddReturnURL2" class="white--text"> </v-img>
                                    </v-card>
                                    <!--Section 2 Text Card-->
                                    <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn2 === true">
                                        <div class="tiptap-vuetify-editor__content" v-html="TextContent2" />
                                    </v-card>
                                    <!--Section 2 Carousel  Card-->
                                    <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel 2" v-if="CarouselAddReturn2.length !== 0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                                    <v-card flat class="mt-4 mx-auto elevation-0">
                                                        <v-carousel hide-delimiters cycle continuous>
                                                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL2" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                                                        </v-carousel>
                                                    </v-card>
                                                </v-responsive>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <!--Section 2 Video Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn2">
                                        <v-card-title>{{ VideoAddReturn2 }}</v-card-title>
                                        <youtube :video-id="VideoId2" player-width="auto" player-height="auto"></youtube>
                                    </v-card>
                                    <!--Section 2 Button Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn2">
                                        <v-card-title>
                                            <v-btn href='{ ButtonURLAdd2 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn2 }}</v-btn>
                                        </v-card-title>
                                    </v-card>
                                    <!--Section 2 Link Card -->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn2">
                                        <v-card-title>
                                            <a href="{ LinkURLAddReturn2 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn2 }}</a>
                                        </v-card-title>
                                    </v-card>
                                </v-card>
                                <!--Content Section 3 dispaly only 1 content type template-->
                                <!--Section 3 Content Type Image template-->
                                <v-card flat class="mt-5" title="Content Section 3:">
                                    <!--Section 3 Image Card -->
                                    <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL3">
                                        <v-img :src="ImageAddReturnURL3" class="white--text"> </v-img>
                                    </v-card>
                                    <!--Section 3 Text Card-->
                                    <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn3 === true">
                                        <div class="tiptap-vuetify-editor__content" v-html="TextContent3" />
                                    </v-card>
                                    <!--Section 3 Carousel  Card-->
                                    <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel 3" v-if="CarouselAddReturn3.length !== 0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                                    <v-card flat class="mt-4 mx-auto elevation-0">
                                                        <v-carousel hide-delimiters cycle continuous>
                                                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL3" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                                                        </v-carousel>
                                                    </v-card>
                                                </v-responsive>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <!--Section 3 Video Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn3">
                                        <v-card-title>{{ VideoAddReturn3 }}</v-card-title>
                                        <youtube :video-id="VideoId3" player-width="auto" player-height="auto"></youtube>
                                    </v-card>
                                    <!--Section 3 Button Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn3">
                                        <v-card-title>
                                            <v-btn href='{ ButtonURLAdd3 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn3 }}</v-btn>
                                        </v-card-title>
                                    </v-card>
                                    <!--Section 3 Link Card -->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn3">
                                        <v-card-title>
                                            <a href="{ LinkURLAddReturn3 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn3 }}</a>
                                            </v-card-title>
                                    </v-card>
                                </v-card>
                                            <!--Content Section 4 dispaly only 1 content type template-->
                                            <!--Section 4 Content Type Image template-->
                                <v-card flat class="mt-5" title="Content Section 4:">
                                    <!--Section 4 Image Card -->
                                    <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL4">
                                        <v-img :src="ImageAddReturnURL4" class="white--text"> </v-img>
                                    </v-card>
                                    <!--Section 4 Text Card-->
                                    <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn4 === true">
                                        <div class="tiptap-vuetify-editor__content" v-html="TextContent4" />
                                    </v-card>
                                    <!--Section 4 Carousel  Card-->
                                    <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel 4" v-if="CarouselAddReturn4.length !== 0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                                    <v-card flat class="mt-4 mx-auto elevation-0">
                                                        <v-carousel hide-delimiters cycle continuous>
                                                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL4" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                                                        </v-carousel>
                                                    </v-card>
                                                </v-responsive>
                                                </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <!--Section 4 Video Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Video" v-if="VideoAddReturn4">
                                        <v-card-title>{{ VideoAddReturn4 }}</v-card-title>
                                        <youtube :video-id="VideoId4" player-width="auto" player-height="auto"></youtube>
                                    </v-card>
                                    <!--Section 4 Button Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn4">
                                        <v-card-title>
                                            <v-btn href='{ ButtonURLAdd2 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn4 }}</v-btn>
                                        </v-card-title>
                                    </v-card>
                                    <!--Section 4 Link Card -->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn4">
                                        <v-card-title>
                                            <a href="{ LinkURLAddReturn4 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn4 }}</a>
                                        </v-card-title>
                                    </v-card>
                                </v-card>
                                <!--Content Section 5 dispaly only 1 content type template-->
                                <!--Section 5 Content Type Image template-->
                                <v-card flat class="mt-5" title="Content Section 5:">
                                    <!--Section 5 Image Card -->
                                    <v-card flat class="mt-5" title="Content Type Image" v-if="ImageAddReturnURL5">
                                        <v-img :src="ImageAddReturnURL5" class="white--text"> </v-img>
                                    </v-card>
                                    <!--Section 5 Text Card-->
                                    <v-card xs12 sm6 md4 lg4 flat class="mt-5" title="Content Type Text" v-if="TextAddReturn5 === true">
                                        <div class="tiptap-vuetify-editor__content" v-html="TextContent5" />
                                    </v-card>
                                    <!--Section 5 Carousel  Card-->
                                    <v-card xs12 sm12 md12 lg12 flat class="mt-5" title="Content Type Carousel" v-if="CarouselAddReturn5.length !== 0">
                                        <v-layout row wrap>
                                            <v-flex xs12 sm12 md12 class="d-flex align-content-center justify-center flex-wrap align-items-center align-lg-content-center align-md-content-center">
                                                <v-responsive :aspect-ratio="16/9" lg-height="1080px" max-height="1080px">
                                                    <v-card flat class="mt-4 mx-auto elevation-0">
                                                        <v-carousel hide-delimiters cycle continuous>
                                                            <v-carousel-item v-for="(item,i) in CarouselAddReturnURL5" :key="i" :src="item" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
                                                        </v-carousel>
                                                    </v-card>
                                                </v-responsive>
                                            </v-flex>
                                        </v-layout>
                                    </v-card>
                                    <!--Section 5 Video Card-->
                                    <v-card xs12 sm12 md12 lg4 class="mt-5" title="Content Type Video" v-if="VideoAddReturn5">
                                        <v-card-title>{{ VideoAddReturn5 }}</v-card-title>
                                        <youtube :video-id="VideoId5" player-width="auto" player-height="auto"></youtube>
                                    </v-card>
                                    <!--Section 5 Button Card-->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Button" v-if="ButtonAddReturn5">
                                        <v-card-title>
                                            <v-btn href='{ ButtonURLAdd5 }' target="_blank" @click="ExternalLink">{{ ButtonAddReturn5 }}</v-btn>
                                        </v-card-title>
                                    </v-card>
                                    <!--Section 5 Link Card -->
                                    <v-card xs12 sm12 md12 lg12 class="mt-5" title="Content Type Link" v-if="LinkURLAddReturn5">
                                        <v-card-title>
                                            <a href="{ LinkURLAddReturn5 }" target="_blank" @click="ExternalLink">{{ LinkURLAddReturn5 }}</a>
                                        </v-card-title>
                                    </v-card>
                                </v-card>
                                <!--Contacts section-->
                                <v-layout row wrap>
                                    <v-flex xs12 sm12 md12 class="d-flex align-content-end justify-end flex-wrap align-items-end align-lg-content-end align-md-content-end">
                                        <template>
                                                <v-speed-dial v-if="FacebookAccount||LineAccount||InstagramAccount" v-model="fab" bottom right small direction="top" transition="slide-y-reverse-transition" fixed>
                                                <template v-slot:activator>
                                                    <v-btn v-model="fab" color="blue darken-2" dark fab>
                                                        <v-icon v-if="fab">mdi-close</v-icon>
                                                        <v-icon v-else>mdi-account-plus</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-btn v-if="LineAccount" fab dark small color="green" :href="LineAccount" target="_blank" @click="ExternalLink">Line
                                                </v-btn>
                                                <v-btn v-if="FacebookAccount" fab dark small color="blue" :href="FacebookAccount" target="_blank" @click="ExternalLink">
                                                    <v-icon>mdi-facebook</v-icon>
                                                </v-btn>
                                                <v-btn v-if="InstagramAccount" fab dark small color="pink" :href="InstagramAccount" target="_blank" @click="ExternalLink">
                                                    <v-icon>mdi-linkedin</v-icon>
                                                </v-btn>
                                            </v-speed-dial>
                                        </template>
                                    </v-flex>
                                </v-layout>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-flex>
            </v-layout>
            <!--Add Contact Section-->
            <v-layout row wrap>
                <v-flex xs12 sm12 md12 lg12 grey lighten-3 class="d-flex align-content-center flex-wrap">
                    <v-card class="mt-12 mx-auto elevation-0" blue-grey lighten-3>
                        <v-col sm12 md12 lg12>
                            <v-card-title>Add Contact Section</v-card-title>
                            <v-card-title>
                                <v-text-field v-model="FacebookAccount" solo flat placeholder="Add Facebook"></v-text-field>
                            </v-card-title>
                        </v-col>
                        <v-col sm12 md12 lg12>
                            <v-card-title>
                                <v-text-field v-model="LineAccount" solo flat placeholder="Add Line"></v-text-field>
                            </v-card-title>
                        </v-col>
                        <v-col sm12 md12 lg12>
                            <v-card-title>
                                <v-text-field v-model="InstagramAccount" solo flat placeholder="Add Instagram"></v-text-field>
                            </v-card-title>
                        </v-col>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>
    </v-container>
</v-app>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/storage"
import db from '../main.js'
//import fb from '../main.js'
//import st from '../main.js'
// import the component and the necessary extensions
import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    CodeBlock,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History
} from 'tiptap-vuetify'
//import undefined from 'firebase/storage'

export default {
    name: 'Newpage',
    components: {
        TiptapVuetify,
    },
    data: () => ({
        // declare extensions you want to use
        extensions: [
            // you can specify options for extension
            new Heading({
                levels: [1, 2, 3]
            }),
            new Bold(),
            new Italic(),
            new Strike(),
            new Underline(),
            new Code(),
            new CodeBlock(),
            new Paragraph(),
            new BulletList(),
            new OrderedList(),
            new ListItem(),
            new Link(),
            new Blockquote(),
            new HardBreak(),
            new HorizontalRule(),
            new History()
        ],
        timeout: 3000,
        snackbar: false,
        PageTitle: '',
        PageSubTitle: '',
        PageID: '',
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
        //Axtivated Content Section
        ActivatedSection2: false,
        ActivatedSection3: false,
        ActivatedSection4: false,
        ActivatedSection5: false,
        //Activate Content Menu Each Section 
        fab: false,
        fab2: false,
        fab3: false,
        fab4: false,
        fab5: false,
        AddContentDialog: false,
        OnlyOneContentAddDialog: false,
        //Activate Content Dialog Each Section
        //Dialog Section 1
        ImageDialog: false,
        TextDialog: false,
        CarouselDialog: false,
        VideoDialog: false,
        ButtonDialog: false,
        LinkDialog: false,

        //Dialog Section 2
        ImageDialog2: false,
        TextDialog2: false,
        CarouselDialog2: false,
        VideoDialog2: false,
        ButtonDialog2: false,
        LinkDialog2: false,

        //Dialog Section 3
        ImageDialog3: false,
        TextDialog3: false,
        CarouselDialog3: false,
        VideoDialog3: false,
        ButtonDialog3: false,
        LinkDialog3: false,

        //Dialog Section 4
        ImageDialog4: false,
        TextDialog4: false,
        CarouselDialog4: false,
        VideoDialog4: false,
        ButtonDialog4: false,
        LinkDialog4: false,

        //Dialog Section 5
        ImageDialog5: false,
        TextDialog5: false,
        CarouselDialog5: false,
        VideoDialog5: false,
        ButtonDialog5: false,
        LinkDialog5: false,

        //Section 1 added content data
        ImageActiveSection1: false,
        ImageAddReturnURL1: '',
        ImageAddReturn1: null,
        CarouselActive1: false,
        CarouselAddReturnURL1: [],
        CarouselAddReturn1: [],
        TextAddReturn1: false,
        LinkURLAdd1: '',
        VideoURLAdd1: '',
        VideoAddReturn1: '',
        //YoutubeVideoID: '',
        ButtonNameAdd1: '',
        ButtonURLAdd1: '',
        ButtonAddReturn1: '',
        LinkURLAddReturn1: '',
        VideoId1: '',
        //  Section 1 Content Type Text data
        TextContent1: ``,

        //Section 2 added content data
        ImageActiveSection2: false,
        CarouselActive2: false,
        ImageAddReturnURL2: '',
        ImageAddReturn2: null,
        CarouselAddReturnURL2: [],
        CarouselAddReturn2: [],
        TextAddReturn2: false,
        LinkURLAdd2: '',
        VideoURLAdd2: '',
        VideoAddReturn2: '',
       // YoutubeVideoID2: '',
        ButtonNameAdd2: '',
        ButtonURLAdd2: '',
        ButtonAddReturn2: '',
        LinkURLAddReturn2: '',
        VideoId2: '',
        //  Section 2 Content Type Text data
        TextContent2: ``,
        //Section 3 added content data
        ImageActiveSection3: false,
        ImageAddReturnURL3: '',
        ImageAddReturn3: null,
        CarouselActive3: false,
        CarouselAddReturnURL3: [],
        CarouselAddReturn3: [],
        TextAddReturn3: false,
        LinkURLAdd3: '',
        VideoURLAdd3: '',
        VideoAddReturn3: '',
     // YoutubeVideoID3: '',
        ButtonNameAdd3: '',
        ButtonURLAdd3: '',
        ButtonAddReturn3: '',
        LinkURLAddReturn3: '',
        VideoId3: '',
        //  Section 3 Content Type Text data
        TextContent3: ``,
        //Section 4 added content data
        ImageActiveSection4: false,
        ImageAddReturnURL4: '',
        ImageAddReturn4: null,
        CarouselActive4: false,
        CarouselAddReturnURL4: [],
        CarouselAddReturn4: [],
        TextAddReturn4: false,
        LinkURLAdd4: '',
        VideoURLAdd4: '',
        VideoAddReturn4: '',
        //YoutubeVideoID4: '',
        ButtonNameAdd4: '',
        ButtonURLAdd4: '',
        ButtonAddReturn4: '',
        LinkURLAddReturn4: '',
        VideoId4: '',
        //  Section 4 Content Type Text data
        TextContent4: ``,
        //Section 5 added content data
        ImageActiveSection5: false,
        ImageAddReturnURL5: '',
        ImageAddReturn5: null,
        CarouselActive5: false,
        CarouselAddReturnURL5: [],
        CarouselAddReturn5: [],
        TextAddReturn5: false,
        LinkURLAdd5: '',
        VideoURLAdd5: '',
        VideoAddReturn5: '',
        //YoutubeVideoID5: '',
        ButtonNameAdd5: '',
        ButtonURLAdd5: '',
        ButtonAddReturn5: '',
        LinkURLAddReturn5: '',
        VideoId5: '',
        //  Section 5 Content Type Text data
        TextContent5: ``,
        //PreView Page Dialog data 
        PreviewDialog: false,
        TitleImage: null,
        TitleImageURL: '',
        //Add Contact data
        FacebookAccount: '',
        LineAccount: '',
        InstagramAccount: '',
    }),
    methods: {
        //TiTile Image method
        PickImage() {
            if (this.TitleImageURL !== '') {
                let ImageDelete = firebase.storage().refFromURL(this.TitleImageURL)
                ImageDelete.delete()
                    .then(() => {
                        this.TitleImageURL = ''
                        this.TitleImage = null
                        this.$refs.PageTitleImagePick.click()
                        console.log('Image1 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.PageTitleImagePick.click()
            }
        },
        TitleImageSelected(event) {
            let file = event.target.files[0] || event.dataTransfer.files[0]
            const fileReader = new FileReader()
            fileReader.addEventListener('load', () => {
                this.TitleImageURL = fileReader.result
            })
            fileReader.readAsDataURL(file)
            this.TitleImage = file

            let TitleImages = this.TitleImage
            var storageRef = firebase.storage().ref('images/' + TitleImages.name)
            let uploadTask = storageRef.put(TitleImages)
            return uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Title Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED:
                        console.log('Title upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING:
                        console.log('Title Upload is running');
                        break;
                }
            }, (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            }, () => {
                return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.snackbar = true
                    console.log('Title image available at', downloadURL)
                    return this.TitleImageURL = downloadURL

                })
            })
        },
        TitleRemoveImage() {
            let ImageDelete = firebase.storage().refFromURL(this.TitleImageURL)
            ImageDelete.delete()
                .then(() => {
                    this.TitleImageURL = ''
                    this.TitleImage = null
                    console.log('Image1 Deleted')
                })
                .catch((error) => {
                    console.error(`file delete error occured: ${error}`)
                })
        },
        //Section 1 Content Method
        //section 1 Text dialog return data method
        TextAddSubmit() {
            if (this.ImageAddReturn1 === null && this.VideoAddReturn1 === '' && this.ButtonAddReturn1 === '' && this.LinkURLAddReturn1 === '' && this.CarouselActive1 === false) 
            {
                 if(this.TextContent1 != '' ){
                this.TextAddReturn1 = true
                this.TextDialog = false
                this.fab = false
                this.ActivatedSection2 = true
            }else{
                this.AddContentDialog = true 
            } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
        //section 1 Link dialog return data method
        LinkAddSubmit() {
            if (this.ImageAddReturn1 === null && this.VideoAddReturn1 === '' && this.ButtonAddReturn1 === '' && this.TextAddReturn1 === false && this.CarouselActive1 === false) 
            {   if(this.LinkURLAdd1 !==''){
                this.LinkURLAddReturn1 = this.LinkURLAdd1
                this.LinkDialog = false
                this.fab = false
                this.ActivatedSection2 = true
                }else {
                this.AddContentDialog = true
                } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
        CancelLinkDialog1(){
                if(this.LinkURLAdd1 !='' && this.LinkURLAddReturn1 == ''){
                this.LinkURLAdd1 = ''
                this.LinkDialog = false
                this.fab = false
            }else{
               this.LinkDialog = false
                this.fab = false 
            }
        },
        //section 1 Button dialog return data method
        ButtonAddSubmit() {
            if (this.ImageAddReturn1 === null && this.VideoAddReturn1 === '' && this.LinkURLAddReturn1 === '' && this.TextAddReturn1 === false && this.CarouselActive1 === false)
             {
                if(this.ButtonNameAdd1 !==''&& this.ButtonURLAdd1 !==''){
                this.ButtonAddReturn1 = this.ButtonNameAdd1
                this.ButtonDialog = false
                this.fab = false
                this.ActivatedSection2 = true
                }else{
               this.AddContentDialog = true
               }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
        CancelButtonDialog1(){
                if(this.ButtonNameAdd1 !=''|| this.ButtonURLAdd1 !='' && this.ButtonAddReturn1 == ''){
                this.ButtonNameAdd1 = ''
                this.ButtonURLAdd1 = ''
                this.ButtonDialog = false
                this.fab = false
            }else{
               this.ButtonDialog = false
                this.fab = false 
            }
        },
        ///////////////section 1 Image Dialog return data method
        //section 1 video dialog return data method
        VideoAddSubmit() {
            if (this.ImageAddReturn1 === null && this.ButtonAddReturn1 === '' && this.LinkURLAddReturn1 === '' && this.TextAddReturn1 === false && this.CarouselActive1 === false) 
            {
                if(this.VideoURLAdd1 !==''){
                this.VideoAddReturn1 = this.VideoURLAdd1
                this.VideoId1 = this.$youtube.getIdFromURL(this.VideoAddReturn1)
                this.VideoDialog = false
                this.fab = false
                this.ActivatedSection2 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
        CancelVideoDialog1(){
            if(this.VideoURLAdd1 !='' && this.VideoAddReturn1 == ''){
                this.VideoURLAdd1 = ''
                this.VideoDialog = false
                this.fab = false
            }else{
               this.VideoDialog = false
                this.fab = false 
            }
        },
        //Section 2 Content Method
        //Section 2 Image change method 
        //section 2 Text dialog return data method
        TextAddSubmit2() {
            if (this.ImageAddReturn2 === null && this.ButtonAddReturn2 === '' && this.LinkURLAddReturn2 === '' && this.VideoAddReturn2 === '' && this.CarouselActive2 === false) 
            {
                  if(this.TextContent2 != '' ){
                this.TextAddReturn2 = true
                this.TextDialog2 = false
                this.fab2 = false
                this.ActivatedSection3 = true
            }else{
                this.AddContentDialog = true 
            } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
        //section 2 Link dialog return data method
        LinkAddSubmit2() {
            if (this.ImageAddReturn2 === null && this.ButtonAddReturn2 === '' && this.VideoAddReturn2 === '' && this.TextAddReturn2 === false && this.CarouselActive2 === false) 
            {
                if(this.LinkURLAdd2 !== ''){
                this.LinkURLAddReturn2 = this.LinkURLAdd2
                this.LinkDialog2 = false
                this.fab2 = false
                this.ActivatedSection3 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
           CancelLinkDialog2(){
                if(this.LinkURLAdd2 !='' && this.LinkURLAddReturn2 == ''){
                this.LinkURLAdd2 = ''
                this.LinkDialog2 = false
                this.fab2 = false
            }else{
               this.LinkDialog2 = false
                this.fab2 = false 
            }
        },
        //section 2 Button dialog return data method
        ButtonAddSubmit2() {
            if (this.ImageAddReturn2 === null && this.LinkURLAddReturn2 === '' && this.VideoAddReturn2 === '' && this.TextAddReturn2 === '' && this.CarouselActive2 === false) 
            {
                if(this.ButtonNameAdd2 !==''&& this.ButtonURLAdd2 !==''){
                this.ButtonAddReturn2 = this.ButtonNameAdd2
                this.ButtonDialog2 = false
                this.fab2 = false
                this.ActivatedSection3 = true
                }else{
               this.AddContentDialog = true
               }
            } else {
                this.OnlyOneContentAddDialog = true
            }
            
        },
          CancelButtonDialog2(){
                if(this.ButtonNameAdd2 !=''|| this.ButtonURLAdd2 !='' && this.ButtonAddReturn2 == ''){
                this.ButtonNameAdd2 = ''
                this.ButtonURLAdd2 = ''
                this.ButtonDialog2 = false
                this.fab2 = false
            }else{
               this.ButtonDialog2 = false
                this.fab2 = false 
            }
        },
        //section 2 Image Dialog return data method
        //section 2 carousel dialog return data method
        //section 2 video dialog return data method
        VideoAddSubmit2() {
            if (this.ButtonAddReturn2 === '' && this.LinkURLAddReturn2 === '' && this.CarouselActive2 === false && this.TextAddReturn2 === false && this.ImageAddReturn2 === null) 
           {if(this.VideoURLAdd2 !=='')
           {
                this.VideoAddReturn2 = this.VideoURLAdd2
                this.VideoId2 = this.$youtube.getIdFromURL(this.VideoAddReturn2)
                this.VideoDialog2 = false
                this.fab2 = false
                this.ActivatedSection3 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
          CancelVideoDialog2(){
            if(this.VideoURLAdd2 !='' && this.VideoAddReturn2 == ''){
                this.VideoURLAdd2 = ''
                this.VideoDialog2 = false
                this.fab2 = false
            }else{
               this.VideoDialog2 = false
                this.fab2 = false 
            }
        },
        //Section 3 Content Method
        //Section 3 Image change method 
        //section 3 Text dialog return data method
        TextAddSubmit3() {
            if (this.ButtonAddReturn3 === '' && this.LinkURLAddReturn3 === '' && this.CarouselActive3 === false && this.VideoAddReturn3 === '' && this.ImageAddReturn3 === null) {
                  if(this.TextContent3 != '' ){
                this.TextAddReturn3 = true
                this.TextDialog3 = false
                this.fab3 = false
                this.ActivatedSection4 = true
            }else{
                this.AddContentDialog = true 
            } 
            }else {
                console.log('error content 3')
                this.OnlyOneContentAddDialog = true
                }
        },
        //section 3 Link dialog return data method
        LinkAddSubmit3() {
            if (this.ButtonAddReturn3 === '' && this.TextAddReturn3 === false && this.CarouselActive3 === false && this.VideoAddReturn3 === '' && this.ImageAddReturn3 === null) 
            {   if(this.LinkURLAdd3 !==''){
                this.LinkURLAddReturn3 = this.LinkURLAdd3
                this.LinkDialog3 = false
                this.fab3 = false
                this.ActivatedSection4 = true
                }else {
                this.AddContentDialog = true
                } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
           CancelLinkDialog3(){
                if(this.LinkURLAdd3 !='' && this.LinkURLAddReturn3 == ''){
                this.LinkURLAdd3 = ''
                this.LinkDialog3 = false
                this.fab3 = false
            }else{
               this.LinkDialog3 = false
                this.fab3 = false 
            }
        },
        //section 3 Button dialog return data method
        ButtonAddSubmit3() {
            if (this.LinkURLAddReturn3 === '' && this.TextAddReturn3 === false && this.CarouselActive3 === false && this.VideoAddReturn3 === '' && this.ImageAddReturn3 === null) 
            {
                if(this.ButtonNameAdd3 !==''&& this.ButtonURLAdd3 !==''){
                this.ButtonAddReturn3 = this.ButtonNameAdd3
                this.ButtonDialog3 = false
                this.fab3 = false
                this.ActivatedSection4 = true
                }else{
               this.AddContentDialog = true
               }
            } else {
                console.log('error content 3')
                this.OnlyOneContentAddDialog = true
            }  
        },
          CancelButtonDialog3(){
                if(this.ButtonNameAdd3 !=''|| this.ButtonURLAdd3 !='' && this.ButtonAddReturn3 == ''){
                this.ButtonNameAdd3 = ''
                this.ButtonURLAdd3 = ''
                this.ButtonDialog3 = false
                this.fab3 = false
            }else{
               this.ButtonDialog3 = false
                this.fab3 = false 
            }
        },
        //section 3 Image Dialog return data method
        //section 3 carousel dialog return data method
        //Section 3 Image change method 
        //section 3 video dialog return data method
        VideoAddSubmit3() {
            if (this.LinkURLAddReturn3 === '' && this.TextAddReturn3 === false &&  this.ButtonAddReturn3 === '' && this.ImageAddReturn3 === null && this.CarouselActive3 === false) 
             {
                  if(this.VideoURLAdd3 !=='')
                  {
                this.VideoAddReturn3 = this.VideoURLAdd3
                this.VideoId3 = this.$youtube.getIdFromURL(this.VideoAddReturn3)
                this.VideoDialog3 = false
                this.fab3 = false
                this.ActivatedSection4 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
          CancelVideoDialog3(){
            if(this.VideoURLAdd3 !='' && this.VideoAddReturn3 == ''){
                this.VideoURLAdd3 = ''
                this.VideoDialog3 = false
                this.fab3 = false
            }else{
               this.VideoDialog3 = false
                this.fab3 = false 
            }
        },
        //Section 4 Content Method
        //Section 4 Image change method 
        //section 4 Text dialog return data method
        TextAddSubmit4() {
            if (this.ButtonAddReturn4 === '' && this.LinkURLAddReturn4 === '' && this.CarouselActive4 === false && this.VideoAddReturn4 === '' && this.ImageAddReturn4 === null) {
                        if(this.TextContent4 != '' ){
                this.TextAddReturn4 = true
                this.TextDialog4 = false
                this.fab4 = false
                this.ActivatedSection5 = true
            }else{
                this.AddContentDialog = true 
            } 
            }else {
                console.log('error content 5')
                this.OnlyOneContentAddDialog = true
                }
        },
        //section 4 Link dialog return data method
        LinkAddSubmit4() {
            if (this.ImageAddReturn4 === null && this.TextAddReturn4 === false && this.ButtonAddReturn4 === '' && this.VideoAddReturn4 === '' && this.CarouselActive4 === false) 
                {   
                    if(this.LinkURLAdd4 !=='')
                    {
                this.LinkURLAddReturn4 = this.LinkURLAdd4
                this.LinkDialog4 = false
                this.fab4 = false
                this.ActivatedSection5 = true
                } else {
                this.AddContentDialog = true
                } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
        CancelLinkDialog4(){
                if(this.LinkURLAdd4 !='' && this.LinkURLAddReturn4 == ''){
                this.LinkURLAdd4 = ''
                this.LinkDialog4 = false
                this.fab4 = false
            }else{
               this.LinkDialog4 = false
                this.fab4 = false 
            }
        },
        //section 4 Button dialog return data method
        ButtonAddSubmit4() {
            if (this.TextAddReturn4 === false && this.LinkURLAddReturn4 === '' && this.CarouselActive4 === false && this.VideoAddReturn4 === '' && this.ImageAddReturn4 === null) 
            {
                 if(this.ButtonNameAdd4 !==''&& this.ButtonURLAdd4 !==''){
                this.ButtonAddReturn4 = this.ButtonNameAdd4
                this.ButtonDialog4 = false
                this.fab4 = false
                this.ActivatedSection5 = true
                }else{
               this.AddContentDialog = true
               }
            } else {
                console.log('error content 4')
                this.OnlyOneContentAddDialog = true
            }
        },
          CancelButtonDialog4(){
                if(this.ButtonNameAdd4 !=''|| this.ButtonURLAdd4 !='' && this.ButtonAddReturn4 == ''){
                this.ButtonNameAdd4 = ''
                this.ButtonURLAdd4 = ''
                this.ButtonDialog4 = false
                this.fab4 = false
            }else{
               this.ButtonDialog4 = false
                this.fab4 = false 
            }
        },
        //section 4 Image Dialog return data method
        //section 4 carousel dialog return data method
        //section 4 video dialog return data method
        VideoAddSubmit4() {
            if (this.TextAddReturn4 === false && this.LinkURLAddReturn4 === '' && this.ImageAddReturn4 === null && this.CarouselActive4 === false && this.ButtonAddReturn4 === '') 
            {
                if(this.VideoURLAdd4 !==''){
                this.VideoAddReturn4 = this.VideoURLAdd4
                this.VideoId4 = this.$youtube.getIdFromURL(this.VideoAddReturn4)
                console.log('Video added')
                this.VideoDialog4 = false
                this.fab4 = false
                this.ActivatedSection5 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },
          CancelVideoDialog4(){
            if(this.VideoURLAdd4 !='' && this.VideoAddReturn4 == ''){
                this.VideoURLAdd4 = ''
                this.VideoDialog4 = false
                this.fab4 = false
            }else{
               this.VideoDialog4 = false
                this.fab4 = false 
            }
        },
        //Section 5 Content Method
        //section 5 Text dialog return data method
        TextAddSubmit5() {
            if (this.VideoAddReturn5 === '' && this.LinkURLAddReturn5 === '' && this.ImageAddReturn5 === null && this.CarouselActive5 === false && this.ButtonAddReturn5 === '') 
            {
                 if(this.TextContent5 != '' ){
                this.TextAddReturn5 = true
                this.TextDialog5 = false
                this.fab5 = false
                //this.ActivatedSection5 = true
            }else{
                this.AddContentDialog = true 
            } 
            }else {
                console.log('error content 1')
                this.OnlyOneContentAddDialog = true
                }
            //this.ActivatedSection5 = true
        },
        //section 5 Link dialog return data method
        LinkAddSubmit5() {
            if (this.VideoAddReturn5 === '' && this.TextAddReturn5 === false && this.ImageAddReturn5 === null && this.CarouselActive5 === false && this.ButtonAddReturn5 === '') 
            {   
                if(this.LinkURLAdd5 !=='')
                {
                this.LinkURLAddReturn5 = this.LinkURLAdd5
                this.LinkDialog5 = false
                this.fab5 = false
                //this.ActivatedSection5 = true
                }else {
                this.AddContentDialog = true
                } 
            }else {
                this.OnlyOneContentAddDialog = true
            }
        },
           CancelLinkDialog5(){
                if(this.LinkURLAdd5 !='' && this.LinkURLAddReturn5 == ''){
                this.LinkURLAdd5 = ''
                this.LinkDialog5 = false
                this.fab5 = false
            }else{
               this.LinkDialog5 = false
                this.fab5 = false 
            }
        },
        //section 5 Button dialog return data method
        ButtonAddSubmit5() {
            if (this.VideoAddReturn5 === '' && this.TextAddReturn5 === false && this.ImageAddReturn5 === null && this.CarouselActive5 === false && this.LinkURLAddReturn5 === '') 
            {
                 if(this.ButtonNameAdd5 !==''&& this.ButtonURLAdd5 !==''){
                this.ButtonAddReturn5 = this.ButtonNameAdd5
                this.ButtonDialog5 = false
                this.fab5 = false
                //this.ActivatedSection5 = true
                }else{
               this.AddContentDialog = true
               }
            } else {
                console.log('error content 5')
                this.OnlyOneContentAddDialog = true
            }
        },
          CancelButtonDialog5(){
                if(this.ButtonNameAdd5 !=''|| this.ButtonURLAdd5 !='' && this.ButtonAddReturn5 == ''){
                this.ButtonNameAdd5 = ''
                this.ButtonURLAdd5 = ''
                this.ButtonDialog5 = false
                this.fab5 = false
            }else{
               this.ButtonDialog5 = false
                this.fab5 = false 
            }
        },
        //section 5 Image Dialog return data method

        //section 5 carousel dialog return data method
        //section 5 video dialog return data method
        VideoAddSubmit5() {
            if (this.CarouselActive5 === false && this.TextAddReturn5 === false && this.ButtonAddReturn5 === '' && this.ImageAddReturn5 === null && this.LinkURLAddReturn5 === '') 
            {
                 if(this.VideoURLAdd5 !==''){
                this.VideoAddReturn5 = this.VideoURLAdd5
                this.VideoId5 = this.$youtube.getIdFromURL(this.VideoAddReturn5)
                console.log('Video added')
                this.VideoDialog5 = false
                this.fab5 = false
                //this.ActivatedSection5 = true
                }else{
                    this.AddContentDialog = true
                }
            } else {
                this.OnlyOneContentAddDialog = true
            }
        },     CancelVideoDialog5(){
            if(this.VideoURLAdd5 !='' && this.VideoAddReturn5 == ''){
                this.VideoURLAdd5 = ''
                this.VideoDialog5 = false
                this.fab5 = false
            }else{
               this.VideoDialog5 = false
                this.fab5 = false 
            }
        },
          CancelTextDialog1() {
            if (this.content != '') {
                if(this.TextAddReturn1 === false){
            this.TextContent1 = ''
            this.TextAddReturn1 = false
            this.TextDialog = false
             this.fab = false 
             }else {
                this.TextDialog = false
                this.fab = false
            }
            } else { 
                this.TextDialog = false
                this.fab = false
            }
        },CancelTextDialog2() {
            if (this.content2 != '') {
                if(this.TextAddReturn2 === false){
            this.content2 = ''
            this.TextAddReturn2 = false
            this.TextDialog2 = false
             this.fab2 = false 
             }else {
                this.TextDialog2 = false
                this.fab2 = false
            }
            } else { 
                this.TextDialog2 = false
                this.fab2 = false
            }
        },
        CancelTextDialog3() {
            if (this.content3 != '') {
                if(this.TextAddReturn3 === false){
            this.content3 = ''
            this.TextAddReturn3 = false
            this.TextDialog3 = false
             this.fab3 = false 
             }else {
                this.TextDialog3 = false
                this.fab3 = false
            }
            } else { 
                this.TextDialog3 = false
                this.fab3 = false
            }
        },
        CancelTextDialog4() {
            if (this.content4 != '') {
                if(this.TextAddReturn4 === false){
            this.content4 = ''
            this.TextAddReturn4 = false
            this.TextDialog4 = false
             this.fab4 = false 
             }else {
                this.TextDialog4 = false
                this.fab4 = false
            }
            } else { 
                this.TextDialog4 = false
                this.fab4 = false
            }
        },
        CancelTextDialog5() {
            if (this.content5 != '') {
                if(this.TextAddReturn5 === false){
            this.content5 = ''
            this.TextAddReturn5 = false
            this.TextDialog5 = false
             this.fab5 = false 
             }else {
                this.TextDialog5 = false
                this.fab5 = false
            }
            } else { 
                this.TextDialog5 = false
                this.fab5 = false
            }
        },
        //open extrnallink method
        ExternalLink() {
            let routeData = this.LinkURLAddReturn1 || this.ButtonURLAdd1 || this.FacebookAccount1 || this.InstagramAccount1|| this.LineAccount1 || this.LinkURLAddReturn2 || this.ButtonURLAdd2 ||
                this.LinkURLAddReturn3 || this.ButtonURLAdd3 || this.LinkURLAddReturn4 || this.ButtonURLAdd4 || this.LinkURLAddReturn5 || this.ButtonURLAdd5
            window.location.href = routeData
        },
        //Activate Preview page dialog
        PreviewDialogOpen() {
            this.PreviewDialog = true
        },
        //Remove Content
        RemoveContentSection1() {
            this.$emit('remove')
            this.RemoveImageContentDialog1()
            this.ImageActiveSection1 = false
            this.TextContent1 = ''
            this.TextAddReturn1 = false
            this.CarouselActive1 = false
            this.CarouselAddReturn1 = []
            this.CarouselAddReturnURL1 = []
            this.VideoURLAdd1 = ''
            this.VideoAddReturn1 = ''
            this.ButtonURLAdd1 = ''
            this.ButtonNameAdd1 = ''
            this.ButtonAddReturn1 = ''
            this.LinkURLAdd1 = ''
            this.LinkURLAddReturn1 = ''
            console.log('remove1')
        },
        RemoveContentSection2() {
            console.log('remove2')
            this.$emit('remove')
            this.RemoveImageContentDialog2()
            this.ImageActiveSection2 = false,

                this.TextContent2 = ''
            this.TextAddReturn2 = false
            this.CarouselActive2 = false
            this.CarouselAddReturn2 = []
            this.CarouselAddReturnURL2 = []
            this.VideoURLAdd2 = ''
            this.VideoAddReturn2 = ''
            this.ButtonURLAdd2 = ''
            this.ButtonNameAdd2 = ''
            this.ButtonAddReturn2 = ''
            this.LinkURLAdd2 = ''
            this.LinkURLAddReturn2 = ''
        },
        RemoveContentSection3() {
            console.log('remove3')
            this.$emit('remove')
            this.RemoveImageContentDialog3()
            this.ImageActiveSection3 = false,
            this.TextContent3 = ''
            this.TextAddReturn3 = false
            this.CarouselActive3 = false
            this.CarouselAddReturn3 = []
            this.CarouselAddReturnURL3 = []
            this.VideoURLAdd3 = ''
            this.VideoAddReturn3 = ''
            this.ButtonURLAdd3 = ''
            this.ButtonNameAdd3 = ''
            this.ButtonAddReturn3 = ''
            this.LinkURLAdd3 = ''
            this.LinkURLAddReturn3 = ''
        },
        RemoveContentSection4() {
            console.log('remove4')
            this.$emit('remove')
            this.RemoveImageContentDialog4()
            this.ImageActiveSection4 = false,
            this.TextContent4 = ''
            this.TextAddReturn4 = false
            this.CarouselActive4 = false
            this.CarouselAddReturn4 = []
            this.CarouselAddReturnURL4 = []
            this.VideoURLAdd4 = ''
            this.VideoAddReturn4 = ''
            this.ButtonURLAdd4 = ''
            this.ButtonNameAdd4 = ''
            this.ButtonAddReturn4 = ''
            this.LinkURLAdd4 = ''
            this.LinkURLAddReturn4 = ''
        },
        RemoveContentSection5() {
            console.log('remove5')
            this.$emit('remove')
            this.RemoveImageContentDialog5()
            this.ImageActiveSection5 = false,
            this.TextContent5 = ''
            this.TextAddReturn5 = false
            this.CarouselActive5 = false
            this.CarouselAddReturn5 = []
            this.CarouselAddReturnURL5 = []
            this.VideoURLAdd5 = ''
            this.VideoAddReturn5 = ''
            this.ButtonURLAdd5 = ''
            this.ButtonNameAdd5 = ''
            this.ButtonAddReturn5 = ''
            this.LinkURLAdd5 = ''
            this.LinkURLAddReturn5 = ''
        },
        //Image Method
        //Image Section 1 Method
        //Add
        ImageAddSubmit1(event) {
            if (this.TextAddReturn1 === false && this.VideoAddReturn1 === '' && this.ButtonAddReturn1 === '' && this.LinkURLAddReturn1 === '' && this.CarouselActive1 === false) {
                let file = event.target.files[0] || event.dataTransfer.files[0]
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.ImageAddReturnURL1 = fileReader.result
                })
                fileReader.readAsDataURL(file)
                this.ImageAddReturn1 = file
            } else {
                console.log('error content 1')
                this.OnlyOneContentAddDialog = true
            }
        }, //Save to display Image Section 1
        SaveImageSection1() {
            if (this.ImageAddReturnURL1 !== '') {
                let ImageAddReturns = this.ImageAddReturn1
                var storageRefImage1 = firebase.storage().ref('images/' + ImageAddReturns.name);
                let uploadTask = storageRefImage1.put(ImageAddReturns)

                return uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload1 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload1 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload1 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        return this.ImageAddReturnURL1 = downloadURL
                    }).then(() => {
                        this.snackbar = true,
                            this.ImageActiveSection1 = true,
                            this.ActivatedSection2 = true,
                            this.ImageDialog = false,
                            this.fab = false
                    })
                })
            } else {
                this.AddContentDialog = true
            }
        }, //Change
        PickImage1() {
            if (this.ImageAddReturnURL1 !== '' && this.ImageAddReturnURL1.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL1)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL1 = ''
                        this.ImageAddReturn1 = null
                        this.$refs.ImagePickContent1.click()
                        console.log('Image1 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.ImagePickContent1.click()
            }
        }, //Remove
        RemoveImageContentDialog1() {
            if (this.ImageAddReturnURL1 !== '' && this.ImageAddReturnURL1.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL1)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL1 = ''
                        this.ImageAddReturn1 = null
                        console.log('Image1 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            } else {
                this.ImageAddReturnURL1 = ''
                this.ImageAddReturn1 = null
            }
        },
        CancelImageDialog1() {
            if (this.ImageActiveSection1 === false) {
                this.ImageAddReturnURL1 = ''
                this.ImageAddReturn1 = null
                this.ImageDialog = false
                this.fab = false
            } else {
                this.ImageDialog = false
                this.fab = false
            }
        },
        //Delete image After get URL from Server 
        deleteImage1() {
            let ImageDelete1 = firebase.storage().refFromURL(this.ImageAddReturnURL1)
            ImageDelete1.delete()
                .then(() => {
                    console.log('Image1 Deleted')
                })
                .catch((error) => {
                    console.error(`file delete error occured: ${error}`)
                })
        },
        //Image Section 2 Method
        //Add
        ImageAddSubmit2(event) {
            if (this.TextAddReturn2 === false && this.VideoAddReturn2 === '' && this.ButtonAddReturn2 === '' && this.LinkURLAddReturn2 === '' && this.CarouselActive2 === false) {
                let file = event.target.files[0] || event.dataTransfer.files[0]
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.ImageAddReturnURL2 = fileReader.result
                })
                fileReader.readAsDataURL(file)
                this.ImageAddReturn2 = file
            } else {
                console.log('error content 2')
                this.OnlyOneContentAddDialog = true
            }
        }, //Save to display Image Section 2
        SaveImageSection2() {
            if (this.ImageAddReturnURL2 !== '') {
                let ImageAddReturns = this.ImageAddReturn2
                var storageRefImage = firebase.storage().ref('images/' + ImageAddReturns.name);
                let uploadTask = storageRefImage.put(ImageAddReturns)

                return uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload2 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload2 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload2 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        return this.ImageAddReturnURL2 = downloadURL
                    }).then(() => {
                        this.snackbar = true,
                            this.ImageActiveSection2 = true,
                            this.ActivatedSection3 = true,
                            this.ImageDialog2 = false,
                            this.fab2 = false
                    })
                })
            } else {
                this.AddContentDialog = true
            }
        }, //Change
        PickImage2() {
            if (this.ImageAddReturnURL2 !== '' && this.ImageAddReturnURL2.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL2)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL2 = ''
                        this.ImageAddReturn2 = null
                        this.$refs.ImagePickContent2.click()
                        console.log('Image1 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.ImagePickContent2.click()
            }
        }, //Remove
        RemoveImageContentDialog2() {
            if (this.ImageAddReturnURL2 !== '' && this.ImageAddReturnURL2.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL2)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL2 = ''
                        this.ImageAddReturn2 = null

                        console.log('Image2 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            } else {
                this.ImageAddReturnURL2 = ''
                this.ImageAddReturn2 = null
            }
        },
        CancelImageDialog2() {
            if (this.ImageActiveSection2 === false) {
                this.ImageAddReturnURL2 = ''
                this.ImageAddReturn2 = null
                this.ImageDialog2 = false
                this.fab2 = false
            } else {
                this.ImageDialog2 = false
                this.fab2 = false
            }
        },

        //Image Section 3 Method
        //Add
        ImageAddSubmit3(event) {
            if (this.TextAddReturn3 === false && this.VideoAddReturn3 === '' && this.ButtonAddReturn3 === '' && this.LinkURLAddReturn3 === '' && this.CarouselActive3 === false) {
                let file = event.target.files[0] || event.dataTransfer.files[0]
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.ImageAddReturnURL3 = fileReader.result
                })
                fileReader.readAsDataURL(file)
                this.ImageAddReturn3 = file
            } else {
                console.log('error content 3')
                this.OnlyOneContentAddDialog = true
            }
        }, //Save to display Image Section 3
        SaveImageSection3() {
            if (this.ImageAddReturnURL3 !== '') {
                let ImageAddReturns = this.ImageAddReturn3
                var storageRefImage = firebase.storage().ref('images/' + ImageAddReturns.name);
                let uploadTask = storageRefImage.put(ImageAddReturns)

                return uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload2 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload2 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload2 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        return this.ImageAddReturnURL3 = downloadURL
                    }).then(() => {
                        this.snackbar = true,
                            this.ImageActiveSection3 = true,
                            this.ActivatedSection4 = true,
                            this.ImageDialog3 = false,
                            this.fab3 = false
                    })
                })
            } else {
                this.AddContentDialog = true
            }
        }, //Change
        PickImage3() {
            if (this.ImageAddReturnURL3 !== '' && this.ImageAddReturnURL3.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL3)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL3 = ''
                        this.ImageAddReturn3 = null
                        this.$refs.ImagePickContent3.click()
                        console.log('Image3 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.ImagePickContent3.click()
            }
        }, //Remove
        RemoveImageContentDialog3() {
            if (this.ImageAddReturnURL3 !== '' && this.ImageAddReturnURL3.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL3)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL3 = ''
                        this.ImageAddReturn3 = null

                        console.log('Image3 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            } else {
                this.ImageAddReturnURL3 = ''
                this.ImageAddReturn3 = null
            }
        },
        CancelImageDialog3() {
            if (this.ImageActiveSection3 === false) {
                this.ImageAddReturnURL3 = ''
                this.ImageAddReturn3 = null
                this.ImageDialog3 = false
                this.fab3 = false
            } else {
                this.ImageDialog3 = false
                this.fab3 = false
            }
        },
        //Image Section 4 Method
        //Add
        ImageAddSubmit4(event) {
            if (this.TextAddReturn4 === false && this.VideoAddReturn4 === '' && this.ButtonAddReturn4 === '' && this.LinkURLAddReturn4 === '' && this.CarouselActive4 === false) {
                let file = event.target.files[0] || event.dataTransfer.files[0]
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.ImageAddReturnURL4 = fileReader.result
                })
                fileReader.readAsDataURL(file)
                this.ImageAddReturn4 = file
            } else {
                console.log('error content 4')
                this.OnlyOneContentAddDialog = true
            }
        }, //Save to display Image Section 4
        SaveImageSection4() {
            if (this.ImageAddReturnURL4 !== '') {
                let ImageAddReturns = this.ImageAddReturn4
                var storageRefImage = firebase.storage().ref('images/' + ImageAddReturns.name);
                let uploadTask = storageRefImage.put(ImageAddReturns)

                return uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload4 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload4 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload4 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        return this.ImageAddReturnURL4 = downloadURL
                    }).then(() => {
                        this.snackbar = true,
                            this.ImageActiveSection4 = true,
                            this.ActivatedSection5 = true,
                            this.ImageDialog4 = false,
                            this.fab4 = false
                    })
                })
            } else {
                this.AddContentDialog = true
            }
        }, //Change
        PickImage4() {
            if (this.ImageAddReturnURL4 !== '' && this.ImageAddReturnURL4.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL3)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL4 = ''
                        this.ImageAddReturn4 = null
                        this.$refs.ImagePickContent4.click()
                        console.log('Image4 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.ImagePickContent4.click()
            }
        }, //Remove
        RemoveImageContentDialog4() {
            if (this.ImageAddReturnURL4 !== '' && this.ImageAddReturnURL4.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL4)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL4 = ''
                        this.ImageAddReturn4 = null

                        console.log('Image4 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            } else {
                this.ImageAddReturnURL4 = ''
                this.ImageAddReturn4 = null
            }
        },
        CancelImageDialog4() {
            if (this.ImageActiveSection4 === false) {
                this.ImageAddReturnURL4 = ''
                this.ImageAddReturn4 = null
                this.ImageDialog4 = false
                this.fab4 = false

            } else {
                this.ImageDialog4 = false
                this.fab4 = false
            }
        },
        //Image Section 5 Method
        //Add
        ImageAddSubmit5(event) {
            if (this.TextAddReturn5 === false && this.VideoAddReturn5 === '' && this.ButtonAddReturn5 === '' && this.LinkURLAddReturn5 === '' && this.CarouselActive5 === false) {
                let file = event.target.files[0] || event.dataTransfer.files[0]
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.ImageAddReturnURL5 = fileReader.result
                })
                fileReader.readAsDataURL(file)
                this.ImageAddReturn5 = file
            } else {
                console.log('error content 5')
                this.OnlyOneContentAddDialog = true
            }
        }, //Save to display Image Section 5
        SaveImageSection5() {
            if (this.ImageAddReturnURL5 !== '') {
                let ImageAddReturns = this.ImageAddReturn5
                var storageRefImage = firebase.storage().ref('images/' + ImageAddReturns.name);
                let uploadTask = storageRefImage.put(ImageAddReturns)

                return uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload5 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload5 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload5 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    return uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        return this.ImageAddReturnURL5 = downloadURL
                    }).then(() => {
                        this.snackbar = true,
                            this.ImageActiveSection5 = true,
                            this.ActivatedSection5 = true,
                            this.ImageDialog5 = false,
                            this.fab5 = false
                    })
                })
            } else {
                this.AddContentDialog = true
            }
        }, //Change
        PickImage5() {
            if (this.ImageAddReturnURL5 !== '' && this.ImageAddReturnURL5.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL5)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL5 = ''
                        this.ImageAddReturn5 = null
                        this.$refs.ImagePickContent5.click()
                        console.log('Image5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })

            } else {
                this.$refs.ImagePickContent5.click()
            }
        }, //Remove
        RemoveImageContentDialog5() {
            if (this.ImageAddReturnURL5 !== '' && this.ImageAddReturnURL5.slice(0, 23) == 'https://firebasestorage') {
                let ImageDelete = firebase.storage().refFromURL(this.ImageAddReturnURL5)
                ImageDelete.delete()
                    .then(() => {
                        this.ImageAddReturnURL5 = ''
                        this.ImageAddReturn5 = null
                        console.log('Image5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
            } else {
                this.ImageAddReturnURL5 = ''
                this.ImageAddReturn5 = null
            }
        },
        CancelImageDialog5() {
            if (this.ImageActiveSection5 === false) {
                this.ImageAddReturnURL5 = ''
                this.ImageAddReturn5 = null
                this.ImageDialog5 = false
                this.fab5 = false
            } else {
                this.ImageDialog5 = false
                this.fab5 = false
            }
        },
        //Carousel methods
        //Carousel Section 1 method
        //Add
        CarouselFileSelect(event) {
            //Check File API support
            this.CarouselAddReturnURL1.length = 0
            if (window.File && window.FileList && window.FileReader) {
                //var preview = document.getElementById("preview");
                let files = event.target.files;
                if (files) {
                    for (let file of files) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.CarouselAddReturnURL1.push(e.target.result)
                            console.log(this.CarouselAddReturnURL1)
                        }
                        reader.readAsDataURL(file);
                        this.CarouselAddReturn1.push(file)
                        console.log(this.CarouselAddReturn1)
                    }
                }
            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }, //change
        CarouselPickImage1() {
            this.$refs.CarouselImagePickContent1.click()
        }, //save to display carousel section 1
        SaveCarouselSection1() {
            if(this.CarouselAddReturn1.length != 0) {
            this.CarouselAddReturnURL1.length = 0
            let CarouselAddReturns1 = this.CarouselAddReturn1
            let i = 0
            let p = []
            for (i = 0; i < CarouselAddReturns1.length; i++) {
                var storageRefCarousel1 = firebase.storage().ref('images/' + CarouselAddReturns1[i].name);
                let uploadTask = storageRefCarousel1.put(CarouselAddReturns1[i])
               let _p = uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload2 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload 2is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload 2is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        this.CarouselAddReturnURL1.push(downloadURL)
                    })
                })
                p.push(_p)
            }
            return Promise.all(p).then(()=>{
               
                 this.CarouselActive1 = true,
            this.ActivatedSection2 = true,
            this.CarouselDialog = false,
            this.fab = false,
             this.snackbar = true
            })
            }else {
                this.AddContentDialog = true
            }
        },
        CancelCarouselDialog1() {
            if (this.CarouselActive1 === false) {
                this.CarouselAddReturnURL1.length = 0
                this.CarouselAddReturn1.length = 0
                this.CarouselDialog = false,
                this.fab = false
            } else {
               this.CarouselDialog = false,
               this.fab = false
            }
        },
         //remove
         RemoveCarouselContentDialog1(){
                if (this.CarouselAddReturnURL1[0] !== null && this.CarouselAddReturnURL1[0] !== undefined ) { 
                    let StorageURL = this.CarouselAddReturnURL1[0].toString()
                    console.log(StorageURL)
                    if(StorageURL.slice(0, 23) == 'https://firebasestorage'){  
            let CarouselAddReturnURLs1 = this.CarouselAddReturnURL1
            let i = 0
            let p = []
                    for (i = 0; i < CarouselAddReturnURLs1.length; i++){
                let ImageDelete = firebase.storage().refFromURL(this.CarouselAddReturnURL1[i])
               let _p = ImageDelete.delete()
                    .then(() => {
                  this.CarouselAddReturnURL1[i] = ''
                  this.CarouselAddReturn1[i] = ''
                        console.log('Image5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
                      p.push(_p)
                    }
                     return Promise.all(p).then(()=>{
                          this.CarouselActive1 = false
                          this.CarouselAddReturnURL1.length = 0
                          this.CarouselAddReturn1.length = 0
                          this.CarouselAddReturnURL1 = []
                          this.CarouselAddReturn1 = []
            })
            }else{
                      this.CarouselActive1 = false
                      this.CarouselAddReturnURL1.length = 0
                      this.CarouselAddReturn1.length = 0
                      this.CarouselAddReturnURL1 = []
                      this.CarouselAddReturn1 = []
            }
            } else {
               this.CarouselAddReturnURL1.length = 0
                this.CarouselAddReturn1.length = 0
            }
         },
        deleteCarouselImage1() {
            this.CarouselActive1 = false
            this.CarouselAddReturnURL1 = []
            this.CarouselAddReturn1 = []
        },
        //Carousel Section 2 method
        //Add
        CarouselFileSelect2(event) {
            //Check File API support
            this.CarouselAddReturnURL2.length = 0
            if (window.File && window.FileList && window.FileReader) {
                //var preview = document.getElementById("preview");
                let files = event.target.files;
                if (files) {
                    for (let file of files) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.CarouselAddReturnURL2.push(e.target.result)
                            console.log(this.CarouselAddReturnURL2)
                        }
                        reader.readAsDataURL(file);
                        this.CarouselAddReturn2.push(file)
                        console.log(this.CarouselAddReturn2)
                    }
                }
            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }, //change
        CarouselPickImage2() {
            this.$refs.CarouselImagePickContent2.click()
        }, //save to display carousel section 1
        SaveCarouselSection2() {
            if(this.CarouselAddReturn2.length != 0) {
            this.CarouselAddReturnURL2.length = 0
            let CarouselAddReturns2 = this.CarouselAddReturn2
            let i = 0
            let p = []
            for (i = 0; i < CarouselAddReturns2.length; i++) {
                var storageRefCarousel2 = firebase.storage().ref('images/' + CarouselAddReturns2[i].name);
                let uploadTask = storageRefCarousel2.put(CarouselAddReturns2[i])
               let _p = uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload cr2 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload cr2is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload cr2is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        this.CarouselAddReturnURL2.push(downloadURL)
                    })
                })
                p.push(_p)
            }
            return Promise.all(p).then(()=>{
               
                 this.CarouselActive2 = true,
            this.ActivatedSection3 = true,
            this.CarouselDialog2 = false,
            this.fab2 = false,
             this.snackbar = true
            })
            }else {
                this.AddContentDialog = true
            }
        },
        CancelCarouselDialog2() {
            if (this.CarouselActive2 === false) {
                this.CarouselAddReturnURL2.length = 0
                this.CarouselAddReturn2.length = 0
                this.CarouselDialog2 = false,
                this.fab2 = false
            } else {
               this.CarouselDialog2 = false,
               this.fab2 = false
            }
        },
         //remove
         RemoveCarouselContentDialog2(){
                if (this.CarouselAddReturnURL2[0] !== null && this.CarouselAddReturnURL2[0] !== undefined ) { 
                    let StorageURL = this.CarouselAddReturnURL2[0].toString()
                    console.log(StorageURL)
                    if(StorageURL.slice(0, 23) == 'https://firebasestorage'){  
            let CarouselAddReturnURLs2 = this.CarouselAddReturnURL2
            let i = 0
            let p = []
                    for (i = 0; i < CarouselAddReturnURLs2.length; i++){
                let ImageDelete = firebase.storage().refFromURL(this.CarouselAddReturnURL2[i])
               let _p = ImageDelete.delete()
                    .then(() => {
                  this.CarouselAddReturnURL2[i] = ''
                  this.CarouselAddReturn2[i] = ''
                        console.log('Image5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
                      p.push(_p)
                    }
                     return Promise.all(p).then(()=>{
                          this.CarouselActive2 = false
                          this.CarouselAddReturnURL2.length = 0
                          this.CarouselAddReturn2.length = 0
                          this.CarouselAddReturnURL2 = []
                          this.CarouselAddReturn2 = []
            })
            }else{
                      this.CarouselActive2 = false
                      this.CarouselAddReturnURL1.length = 0
                      this.CarouselAddReturn2.length = 0
                      this.CarouselAddReturnURL2 = []
                      this.CarouselAddReturn2 = []
            }
            } else {
               this.CarouselAddReturnURL2.length = 0
                this.CarouselAddReturn2.length = 0
            }
         },
        //remove
        deleteCarouselImage2() {
            this.CarouselActive2 = false
            this.CarouselAddReturnURL2 = []
            this.CarouselAddReturn2 = []
        },
        //Carousel Section 3 method
        //Add
        CarouselFileSelect3(event) {
            //Check File API support
            this.CarouselAddReturnURL1.length = 0
            if (window.File && window.FileList && window.FileReader) {
                //var preview = document.getElementById("preview");
                let files = event.target.files;
                if (files) {
                    for (let file of files) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.CarouselAddReturnURL3.push(e.target.result)
                            console.log(this.CarouselAddReturnURL3)
                        }
                        reader.readAsDataURL(file);
                        this.CarouselAddReturn3.push(file)
                        console.log(this.CarouselAddReturn3)
                    }
                }
            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }, //change
        CarouselPickImage3() {
            this.$refs.CarouselImagePickContent3.click()
        }, //save to display carousel section 1
        SaveCarouselSection3() {
            if(this.CarouselAddReturn3.length != 0) {
            this.CarouselAddReturnURL3.length = 0
            let CarouselAddReturns3 = this.CarouselAddReturn3
            let i = 0
            let p = []
            for (i = 0; i < CarouselAddReturns3.length; i++) {
                var storageRefCarousel3 = firebase.storage().ref('images/' + CarouselAddReturns3[i].name);
                let uploadTask = storageRefCarousel3.put(CarouselAddReturns3[i])
               let _p = uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload cr3 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload  cr3 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload cr3 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        this.CarouselAddReturnURL3.push(downloadURL)
                    })
                })
                p.push(_p)
            }
            return Promise.all(p).then(()=>{
               
                 this.CarouselActive3 = true,
            this.ActivatedSection4 = true,
            this.CarouselDialog3 = false,
            this.fab3 = false,
             this.snackbar = true
            })
            }else {
                this.AddContentDialog = true
            }
        },
        CancelCarouselDialog3() {
            if (this.CarouselActive3 === false) {
                this.CarouselAddReturnURL3.length = 0
                this.CarouselAddReturn3.length = 0
                this.CarouselDialog3 = false,
                this.fab3 = false
            } else {
               this.CarouselDialog3 = false,
               this.fab3 = false
            }
        },
         //remove
         RemoveCarouselContentDialog3(){
                if (this.CarouselAddReturnURL3[0] !== null && this.CarouselAddReturnURL3[0] !== undefined ) { 
                    let StorageURL = this.CarouselAddReturnURL3[0].toString()
                    console.log(StorageURL)
                    if(StorageURL.slice(0, 23) == 'https://firebasestorage'){  
            let CarouselAddReturnURLs3 = this.CarouselAddReturnURL3
            let i = 0
            let p = []
                    for (i = 0; i < CarouselAddReturnURLs3.length; i++){
                let ImageDelete = firebase.storage().refFromURL(this.CarouselAddReturnURL3[i])
               let _p = ImageDelete.delete()
                    .then(() => {
                  this.CarouselAddReturnURL3[i] = ''
                  this.CarouselAddReturn3[i] = ''
                        console.log('Image5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
                      p.push(_p)
                    }
                     return Promise.all(p).then(()=>{
                          this.CarouselActive3 = false
                          this.CarouselAddReturnURL3.length = 0
                          this.CarouselAddReturn3.length = 0
                          this.CarouselAddReturnURL3 = []
                          this.CarouselAddReturn3 = []
            })
            }else{
                      this.CarouselActive3 = false
                      this.CarouselAddReturnURL3.length = 0
                      this.CarouselAddReturn3.length = 0
                      this.CarouselAddReturnURL3 = []
                      this.CarouselAddReturn3 = []
            }
            } else {
               this.CarouselAddReturnURL3.length = 0
                this.CarouselAddReturn3.length = 0
            }
         },
         //remove
        deleteCarouselImage3() {
            this.CarouselActive3 = false
            this.CarouselAddReturnURL3 = []
            this.CarouselAddReturn3 = []
        },
        //Carousel Section 4 method
        //Add
        CarouselFileSelect4(event) {
            //Check File API support
            this.CarouselAddReturnURL4.length = 0
            if (window.File && window.FileList && window.FileReader) {
                let files = event.target.files;
                if (files) {
                    for (let file of files) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.CarouselAddReturnURL4.push(e.target.result)
                            console.log(this.CarouselAddReturnURL4)
                        }
                        reader.readAsDataURL(file);
                        this.CarouselAddReturn4.push(file)
                        console.log(this.CarouselAddReturn4)
                    }
                }
            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }, //change
        CarouselPickImage4() {
            this.$refs.CarouselImagePickContent4.click()
        }, //save to display carousel section 4
        SaveCarouselSection4() {
            if(this.CarouselAddReturn4.length != 0) {
            this.CarouselAddReturnURL4.length = 0
            let CarouselAddReturns4 = this.CarouselAddReturn4
            let i = 0
            let p = []
            for (i = 0; i < CarouselAddReturns4.length; i++) {
                var storageRefCarousel4 = firebase.storage().ref('images/' + CarouselAddReturns4[i].name);
                let uploadTask = storageRefCarousel4.put(CarouselAddReturns4[i])
               let _p = uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload cr4 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload cr4 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload cr4 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        this.CarouselAddReturnURL4.push(downloadURL)
                    })
                })
                p.push(_p)
            }
            return Promise.all(p).then(()=>{
                 this.CarouselActive4 = true,
            this.CarouselDialog4 = false,
            this.fab4 = false,
             this.snackbar = true
             this.ActivatedSection5 = true
            })
            }else {
                this.AddContentDialog = true
            }
        },
        CancelCarouselDialog4() {
            if (this.CarouselActive4 === false) {
                this.CarouselAddReturnURL4.length = 0
                this.CarouselAddReturn4.length = 0
                this.CarouselDialog4= false,
                this.fab4 = false
            } else {
               this.CarouselDialog4 = false,
               this.fab4 = false
            }
        },
         //remove
         RemoveCarouselContentDialog4(){
                if (this.CarouselAddReturnURL4[0] !== null && this.CarouselAddReturnURL4[0] !== undefined ) { 
                    let StorageURL = this.CarouselAddReturnURL4[0].toString()
                    console.log(StorageURL)
                    if(StorageURL.slice(0, 23) == 'https://firebasestorage'){  
            let CarouselAddReturnURLs4 = this.CarouselAddReturnURL4
            let i = 0
            let p = []
                    for (i = 0; i < CarouselAddReturnURLs4.length; i++){
                let ImageDelete = firebase.storage().refFromURL(this.CarouselAddReturnURL4[i])
               let _p = ImageDelete.delete()
                    .then(() => {
                  this.CarouselAddReturnURL4[i] = ''
                  this.CarouselAddReturn4[i] = ''
                        console.log('CR5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
                      p.push(_p)
                    }
                     return Promise.all(p).then(()=>{
                          this.CarouselActive4 = false
                          this.CarouselAddReturnURL4.length = 0
                          this.CarouselAddReturn4.length = 0
                          this.CarouselAddReturnURL4 = []
                          this.CarouselAddReturn4 = []
            })
            }else{
                      this.CarouselActive4 = false
                      this.CarouselAddReturnURL4.length = 0
                      this.CarouselAddReturn4.length = 0
                      this.CarouselAddReturnURL4 = []
                      this.CarouselAddReturn4 = []
            }
            } else {
               this.CarouselAddReturnURL4.length = 0
                this.CarouselAddReturn4.length = 0
            }
         },
         //remove
        deleteCarouselImage4() {
            this.CarouselActive4 = false
            this.CarouselAddReturnURL4 = []
            this.CarouselAddReturn4 = []
        },
        //Carousel Section 5 method
               //Add
        CarouselFileSelect5(event) {
            //Check File API support
            this.CarouselAddReturnURL5.length = 0
            if (window.File && window.FileList && window.FileReader) {
                let files = event.target.files;
                if (files) {
                    for (let file of files) {
                        let reader = new FileReader();
                        reader.onload = (e) => {
                            this.CarouselAddReturnURL5.push(e.target.result)
                            console.log(this.CarouselAddReturnURL5)
                        }
                        reader.readAsDataURL(file);
                        this.CarouselAddReturn5.push(file)
                        console.log(this.CarouselAddReturn5)
                    }
                }
            } else {
                alert("Your browser is too old to support HTML5 File API");
            }
        }, //change
        CarouselPickImage5() {
            this.$refs.CarouselImagePickContent5.click()
        }, //save to display carousel section 5
        SaveCarouselSection5() {
            if(this.CarouselAddReturn5.length != 0) {
            this.CarouselAddReturnURL5.length = 0
            let CarouselAddReturns5 = this.CarouselAddReturn5
            let i = 0
            let p = []
            for (i = 0; i < CarouselAddReturns5.length; i++) {
                var storageRefCarousel5 = firebase.storage().ref('images/' + CarouselAddReturns5[i].name);
                let uploadTask = storageRefCarousel5.put(CarouselAddReturns5[i])
               let _p = uploadTask.on('state_changed', function (snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload cr5 is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED:
                            console.log('Upload cr5 is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING:
                            console.log('Upload cr5 is running');
                            break;
                    }
                }, (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            break;
                        case 'storage/canceled':
                            break;
                        case 'storage/unknown':
                            break;
                    }
                }, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL)
                        this.CarouselAddReturnURL5.push(downloadURL)
                    })
                })
                p.push(_p)
            }
            return Promise.all(p).then(()=>{
                 this.CarouselActive5 = true,
            this.CarouselDialog5 = false,
            this.fab5 = false,
             this.snackbar = true
            })
            }else {
                this.AddContentDialog = true
            }
        },
        CancelCarouselDialog5() {
            if (this.CarouselActive5 === false) {
                this.CarouselAddReturnURL5.length = 0
                this.CarouselAddReturn5.length = 0
                this.CarouselDialog5= false,
                this.fab5 = false
            } else {
               this.CarouselDialog5 = false,
               this.fab5 = false
            }
        },
         //remove
         RemoveCarouselContentDialog5(){
                if (this.CarouselAddReturnURL5[0] !== null && this.CarouselAddReturnURL5[0] !== undefined ) { 
                    let StorageURL = this.CarouselAddReturnURL5[0].toString()
                    console.log(StorageURL)
                    if(StorageURL.slice(0, 23) == 'https://firebasestorage'){  
            let CarouselAddReturnURLs5 = this.CarouselAddReturnURL5
            let i = 0
            let p = []
                    for (i = 0; i < CarouselAddReturnURLs5.length; i++){
                let ImageDelete = firebase.storage().refFromURL(this.CarouselAddReturnURL5[i])
               let _p = ImageDelete.delete()
                    .then(() => {
                  this.CarouselAddReturnURL5[i] = ''
                  this.CarouselAddReturn5[i] = ''
                        console.log('CR5 Deleted')
                    })
                    .catch((error) => {
                        console.error(`file delete error occured: ${error}`)
                    })
                      p.push(_p)
                    }
                     return Promise.all(p).then(()=>{
                          this.CarouselActive5 = false
                          this.CarouselAddReturnURL5.length = 0
                          this.CarouselAddReturn5.length = 0
                          this.CarouselAddReturnURL5 = []
                          this.CarouselAddReturn5 = []
            })
            }else{
                      this.CarouselActive5 = false
                      this.CarouselAddReturnURL5.length = 0
                      this.CarouselAddReturn5.length = 0
                      this.CarouselAddReturnURL5 = []
                      this.CarouselAddReturn5 = []
            }
            } else {
               this.CarouselAddReturnURL5.length = 0
                this.CarouselAddReturn5.length = 0
            }
         },
         //remove
        deleteCarouselImage5() {
            this.CarouselActive5 = false
            this.CarouselAddReturnURL5 = []
            this.CarouselAddReturn5 = []
        },
 
       
    
        PageSave() {
            this.DelayUpload()
            this.PageID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

            db.collection('yourpages').add({
                    //tittle section
                    PageID: this.PageID,
                    PageTitle: this.PageTitle,
                    PageSubTitle: this.PageSubTitle,
                    TitleImageURL: this.TitleImageURL,
                    //section1
                    ImageActiveSection1: this.ImageActiveSection1,
                    ImageAddReturnURL1: this.ImageAddReturnURL1,
                    TextAddReturn1: this.TextAddReturn1,
                    TextContent1: this.TextContent1,
                    CarouselActive1: this.CarouselActive1,
                    CarouselAddReturnURL1: this.CarouselAddReturnURL1,
                    VideoAddReturn1: this.VideoAddReturn1,
                    VideoId1: this.VideoId1,
                    ButtonURLAdd1: this.ButtonURLAdd1,
                    ButtonAddReturn1: this.ButtonAddReturn1,
                    LinkURLAddReturn1: this.LinkURLAddReturn1,
                    LinkURLAdd1: this.LinkURLAdd1,
                    VideoURLAdd1: this.VideoURLAdd1,
                    //YoutubeVideoID: this.VideoURLAdd,
                    ButtonNameAdd1: this.ButtonNameAdd1,

                    //section 2
                    ImageActiveSection2: this.ImageActiveSection2,
                    ImageAddReturnURL2: this.ImageAddReturnURL2,
                    TextAddReturn2: this.TextAddReturn2,
                    TextContent2: this.TextContent2,
                    CarouselActive2: this.CarouselActive2,
                    CarouselAddReturnURL2: this.CarouselAddReturnURL2,
                    VideoAddReturn2: this.VideoAddReturn2,
                    ButtonURLAdd2: this.ButtonURLAdd2,
                    ButtonAddReturn2: this.ButtonAddReturn2,
                    LinkURLAddReturn2: this.LinkURLAddReturn2,
                    //section 3 
                    ImageActiveSection3: this.ImageActiveSection3,
                    ImageAddReturnURL3: this.ImageAddReturnURL3,
                    TextAddReturn3: this.TextAddReturn3,
                    TextContent3: this.TextContent3,
                    CarouselActive3: this.CarouselActive3,
                    CarouselAddReturnURL3: this.CarouselAddReturnURL3,
                    VideoAddReturn3: this.VideoAddReturn3,
                    ButtonURLAdd3: this.ButtonURLAdd3,
                    ButtonAddReturn3: this.ButtonAddReturn3,
                    LinkURLAddReturn3: this.LinkURLAddReturn3,
                    //section 4
                    ImageActiveSection4: this.ImageActiveSection4,
                    ImageAddReturnURL4: this.ImageAddReturnURL4,
                    TextAddReturn4: this.TextAddReturn4,
                    TextContent4: this.TextContent4,
                    CarouselActive4: this.CarouselActive4,
                    CarouselAddReturnURL4: this.CarouselAddReturnURL4,
                    VideoAddReturn4: this.VideoAddReturn4,
                    ButtonURLAdd4: this.ButtonURLAdd4,
                    ButtonAddReturn4: this.ButtonAddReturn4,
                    LinkURLAddReturn4: this.LinkURLAddReturn4,
                    //section 5 
                    ImageActiveSection5: this.ImageActiveSection5,
                    ImageAddReturnURL5: this.ImageAddReturnURL5,
                    TextAddReturn5: this.TextAddReturn5,
                    TextContent5: this.TextContent5,
                    CarouselActive5: this.CarouselActive5,
                    CarouselAddReturnURL5: this.CarouselAddReturnURL5,
                    VideoAddReturn5: this.VideoAddReturn5,
                    ButtonURLAdd5: this.ButtonURLAdd5,
                    ButtonAddReturn5: this.ButtonAddReturn5,
                    LinkURLAddReturn5: this.LinkURLAddReturn5,
                    //Add Contact data

                    FacebookAccount: this.FacebookAccount,
                    LineAccount: this.LineAccount,
                    InstagramAccount: this.InstagramAccount,
                    //dialog data 
               
                    ActivatedSection2: this.ActivatedSection2,
                    ActivatedSection3: this.ActivatedSection3,
                    ActivatedSection4: this.ActivatedSection4,
                    ActivatedSection5: this.ActivatedSection5,
                    //Activate Content Menu Each Section 

                  
                })
                .then(docref => console.log("Document written with ID: ", docref.id), this.$router.push('/library'))
                .catch(error => console.log("Error adding document: ", error))
        },
        DelayUpload() {
            setTimeout(() => {}, 10000); // เพื่อทำการ delay การทำงาน
            return "Long Time Hello"
        },
        async SaveComplete() {
            await setTimeout(() => {}, 10 * 1000); // เพื่อทำการ delay การทำงาน
            await this.$router.push('/library')
            return "complete"
        },
        async main() {
            //let a = await this.AllImagesUpload()
            //let b = await this.DelayUpload(a)
            //let c = await this.PageSave(b)
            //let d = await this.SaveComplete(c)
            //console.log(d)
        },
    },
}
</script>

<style>
.thumbnail {
    height: 200px;
    margin: 10px;
}
</style>
